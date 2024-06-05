export type FormData = {
  recipient: string;
  subject: string;
  body: string;
  options: {
    attachments?: Blob[];
  };
};
