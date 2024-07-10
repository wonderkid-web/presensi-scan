"use client";

// pages/update.tsx
import { useEffect } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { useRouter } from "next/navigation";
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

const Update = ({ params: { id: userId } }: { params: { id: string } }) => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<IFormInput>();
  const router = useRouter();

  useEffect(() => {
    const fetchUserData = async () => {
      if (userId) {
        const { data, error } = await supabase
          .from("user")
          .select("*")
          .eq("id", userId)
          .single();

        if (error) {
          console.error("Error fetching user data:", error);
          return;
        }

        if (data) {
          setValue("email", data.email);
          setValue("name", data.name);
          setValue("nip", data.nip);
          setValue("job_title", data.job_title);
          setValue("address", data.address);
          setValue("contact", data.contact);
        }
      }
    };

    fetchUserData();
  }, [userId, setValue]);

  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    const { email, password, name, nip, job_title, address, contact } = data;

    const updates = { email, name, nip, job_title, address, contact, password };

    // if (password) {
    //   const { error: authError } = await supabase.auth.updateUser({
    //     email,
    //     password,
    //   });

    //   if (authError) {
    //     console.error("Error updating auth data:", authError);
    //     return;
    //   }
    // }

    const { error: updateError } = await supabase
      .from("user")
      .update(updates)
      .eq("id", userId);

    if (updateError) {
      console.error("Error updating user data:", updateError);
      return;
    }

    toast.success("Berhasil memperbarui data!", {
      onAutoClose() {
        router.push("/pegawai");
      },
    });
  };

  return (
    <div>
      <Toaster richColors={true} />
      <div className="flex justify-center items-center">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="bg-white p-8 rounded-lg shadow-md w-full max-w-4xl"
        >
          <h2 className="text-2xl font-bold mb-6 text-center">Update Data</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 justify-center">
            <div className="mb-4">
              <label className="block text-gray-700">Email</label>
              <input
                type="email"
                {...register("email", { required: true })}
                className={`mt-1 p-2 w-full border rounded ${
                  errors.email ? "border-red-500" : "border-gray-300"
                }`}
              />
              {errors.email && (
                <span className="text-red-500 text-sm">
                  This field is required
                </span>
              )}
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Password (Optional)</label>
              <input
                type="password"
                {...register("password")}
                className="mt-1 p-2 w-full border rounded border-gray-300"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Nama</label>
              <input
                {...register("name", { required: true })}
                className={`mt-1 p-2 w-full border rounded ${
                  errors.name ? "border-red-500" : "border-gray-300"
                }`}
              />
              {errors.name && (
                <span className="text-red-500 text-sm">
                  This field is required
                </span>
              )}
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">NIP</label>
              <input
                {...register("nip", { required: true })}
                className={`mt-1 p-2 w-full border rounded ${
                  errors.nip ? "border-red-500" : "border-gray-300"
                }`}
              />
              {errors.nip && (
                <span className="text-red-500 text-sm">
                  This field is required
                </span>
              )}
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Jabatan</label>
              <input
                {...register("job_title", { required: true })}
                className={`mt-1 p-2 w-full border rounded ${
                  errors.job_title ? "border-red-500" : "border-gray-300"
                }`}
              />
              {errors.job_title && (
                <span className="text-red-500 text-sm">
                  This field is required
                </span>
              )}
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Alamat</label>
              <input
                {...register("address", { required: true })}
                className={`mt-1 p-2 w-full border rounded ${
                  errors.address ? "border-red-500" : "border-gray-300"
                }`}
              />
              {errors.address && (
                <span className="text-red-500 text-sm">
                  This field is required
                </span>
              )}
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Kontak</label>
              <input
                {...register("contact", { required: true })}
                className={`mt-1 p-2 w-full border rounded ${
                  errors.contact ? "border-red-500" : "border-gray-300"
                }`}
              />
              {errors.contact && (
                <span className="text-red-500 text-sm">
                  This field is required
                </span>
              )}
            </div>
          </div>
          <div className="flex justify-center mt-6">
            <button
              type="submit"
              className="py-2 px-4 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Update
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Update;
