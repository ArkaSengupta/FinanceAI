import PageMeta from "../../components/common/PageMeta";
import AuthLayout from "./AuthPageLayout";
import SignInForm from "../../components/auth/SignInForm";
import { pageMetaTitle } from "../../components/common/pageMetaVars";

export default function SignIn() {
  return (
    <>
      <PageMeta
        title={pageMetaTitle}
        description=""
      />
      <AuthLayout>
        <SignInForm />
      </AuthLayout>
    </>
  );
}
