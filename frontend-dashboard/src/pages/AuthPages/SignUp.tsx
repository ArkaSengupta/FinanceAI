import PageMeta from "../../components/common/PageMeta";
import AuthLayout from "./AuthPageLayout";
import SignUpForm from "../../components/auth/SignUpForm";
import { pageMetaTitle } from "../../components/common/pageMetaVars";

export default function SignUp() {
  return (
    <>
      <PageMeta
        title={pageMetaTitle}
        description=""
      />
      <AuthLayout>
        <SignUpForm />
      </AuthLayout>
    </>
  );
}
