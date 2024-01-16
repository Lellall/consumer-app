import { SerializedError } from '@reduxjs/toolkit';

export type ApiError = {
  status: number;
  message: string;
};

export type Error = ApiError | SerializedError | undefined;
