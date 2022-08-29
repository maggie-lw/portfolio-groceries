import ChangePassword from "../../components/Profile/ChangePassword";

const ChangePasswordPage = () => {
    return <div><ChangePassword /></div>
};

export async function getStaticProps(context) {
    return {
      props: {
        protected: true,
      },
    }
  }

export default ChangePasswordPage;