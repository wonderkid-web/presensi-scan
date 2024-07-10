"use client";

// pages/register.tsx
import { useForm, SubmitHandler } from "react-hook-form";
import { useRouter } from "next/navigation";
import uuid from "react-uuid";
import { supabase } from "@/lib/supabase";
import { Toaster, toast } from "sonner";

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

    const isAvailable = await supabase.from("user").select("*").eq("nip", nip)
    

    if(isAvailable.data?.length){
      toast.info("NIP sudah terdaftar!")
      return null
    }

    const { error, data: akunBaru } = await supabase.auth.signUp({
      email,
      password,
    });

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
        password
      },
    ]);

    if (insertError) {
      console.error("Error inserting user data:", insertError);
      return;
    }

    toast.success("Berhasil Menambahkan akun baru!", {
      onAutoClose() {
        router.push("/pegawai");
      },
    });
  };

  return (
    <div>
      <div className="flex justify-center items-center">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="bg-white p-8 rounded-lg shadow-md w-full max-w-4xl"
        >
          <h2 className="text-2xl font-bold mb-6 text-center">Register</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 justify-center">
            <div className="mb-4">
              <label className="block text-gray-700">Email</label>
              <input
                type="email"
                {...register("email", { required: "Email is required" })}
                className={`mt-1 p-2 w-full border rounded ${
                  errors.email ? "border-red-500" : "border-gray-300"
                }`}
              />
              {errors.email && (
                <span className="text-red-500 text-sm">
                  {errors.email.message}
                </span>
              )}
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Password</label>
              <input
                type="password"
                {...register("password", { required: "Password is required" })}
                className={`mt-1 p-2 w-full border rounded ${
                  errors.password ? "border-red-500" : "border-gray-300"
                }`}
              />
              {errors.password && (
                <span className="text-red-500 text-sm">
                  {errors.password.message}
                </span>
              )}
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Nama</label>
              <input
                {...register("name", { required: "Nama is required" })}
                className={`mt-1 p-2 w-full border rounded ${
                  errors.name ? "border-red-500" : "border-gray-300"
                }`}
              />
              {errors.name && (
                <span className="text-red-500 text-sm">
                  {errors.name.message}
                </span>
              )}
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">NIP</label>
              <input
                {...register("nip", { required: "NIP is required" })}
                className={`mt-1 p-2 w-full border rounded ${
                  errors.nip ? "border-red-500" : "border-gray-300"
                }`}
              />
              {errors.nip && (
                <span className="text-red-500 text-sm">
                  {errors.nip.message}
                </span>
              )}
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Jabatan</label>
              <input
                {...register("job_title", { required: "Jabatan is required" })}
                className={`mt-1 p-2 w-full border rounded ${
                  errors.job_title ? "border-red-500" : "border-gray-300"
                }`}
              />
              {errors.job_title && (
                <span className="text-red-500 text-sm">
                  {errors.job_title.message}
                </span>
              )}
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Alamat</label>
              <input
                {...register("address", { required: "Alamat is required" })}
                className={`mt-1 p-2 w-full border rounded ${
                  errors.address ? "border-red-500" : "border-gray-300"
                }`}
              />
              {errors.address && (
                <span className="text-red-500 text-sm">
                  {errors.address.message}
                </span>
              )}
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Kontak</label>
              <input
                {...register("contact", { required: "Kontak is required" })}
                className={`mt-1 p-2 w-full border rounded ${
                  errors.contact ? "border-red-500" : "border-gray-300"
                }`}
              />
              {errors.contact && (
                <span className="text-red-500 text-sm">
                  {errors.contact.message}
                </span>
              )}
            </div>
          </div>
          <div className="flex justify-center mt-6">
            <button
              type="submit"
              className="py-2 px-4 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Register
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
