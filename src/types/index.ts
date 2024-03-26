import { UUID } from "crypto";

export interface Code {
    createdAt: string;
    code_masuk: UUID,
    code_keluar: UUID
  }