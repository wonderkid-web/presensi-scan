import { UUID } from "crypto";

export interface Code {
    createdAt: string;
    code_masuk: UUID,
    code_keluar: UUID
  }


export interface User {
  id: string;
  username: string;
  name: string;
  nip: string;
  job_title: string;
  address: string;
  contact: string;
  created_at: string;
  email: string;
}