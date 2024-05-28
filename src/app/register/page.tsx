"use client";

// pages/register.tsx
import { useForm, SubmitHandler } from "react-hook-form";
import { useRouter } from "next/navigation";
import uuid from "react-uuid";
import { supabase } from "@/lib/supabase";

interface IFormInput {
  email: string;
  password: string;
  name: string;
  nip: string;
  job_title: string;
  address: string;
  contact: string;
}

const Register = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInput>();
  const router = useRouter();

  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    const { email, password, name, nip, job_title, address, contact } = data;

    const { error } = await supabase.auth.signUp({ email, password });

    if (error) {
      console.error("Error signing up:", error.status);
      return;
    }

    const { error: insertError } = await supabase.from("user").insert([
      {
        id: uuid(),
        name,
        nip,
        job_title,
        address,
        contact,
        email,
      },
    ]);

    if (insertError) {
      console.error("Error inserting user data:", insertError);
      return;
    }

    router.push("/");
  };

  return (
    <div>
      <h1>Register</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label>Email</label>
          <input type="email" {...register("email", { required: true })} />
          {errors.email && <span>This field is required</span>}
        </div>
        <div>
          <label>Password</label>
          <input
            type="password"
            {...register("password", { required: true })}
          />
          {errors.password && <span>This field is required</span>}
        </div>
        <div>
          <label>Nama</label>
          <input {...register("name", { required: true })} />
          {errors.name && <span>This field is required</span>}
        </div>
        <div>
          <label>NIP</label>
          <input {...register("nip", { required: true })} />
          {errors.nip && <span>This field is required</span>}
        </div>
        <div>
          <label>Jabatan</label>
          <input {...register("job_title", { required: true })} />
          {errors.job_title && <span>This field is required</span>}
        </div>
        <div>
          <label>Alamat</label>
          <input {...register("address", { required: true })} />
          {errors.address && <span>This field is required</span>}
        </div>
        <div>
          <label>Kontak</label>
          <input {...register("contact", { required: true })} />
          {errors.contact && <span>This field is required</span>}
        </div>
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default Register;
