export interface FormProps {
  name?: string;
  image?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
}

export interface ErrorWrapperProps {
  message: string;
  buttonLabel?: string;
  backUrl?: string;
}

export interface ProfilePageProps {
  data: { name: string; email: string; id: string; image?: string };
}
