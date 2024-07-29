import type { PageProps } from "keycloakify/login/pages/PageProps";
import type { KcContext } from "../kcContext";
import type { I18n } from "../i18n";

export default function LoginVerifyEmail(
  props: PageProps<
    Extract<KcContext, { pageId: "login-verify-email.ftl" }>,
    I18n
  >
) {
  const { kcContext, i18n, doUseDefaultCss, Template, classes } = props;

  const { msg } = i18n;

  const { url, user } = kcContext;

  return (
    <Template
      {...{ kcContext, i18n, doUseDefaultCss, classes }}
      displayMessage={false}
      headerNode="Email Sent"
      subtitle="Please check your inbox to see your verification link."
    >
      <div className="instruction-container" style={{paddingTop:"20px"}}>
        {/* <p className="instruction">
          {msg("emailVerifyInstruction1", user?.email)}
        </p>
        <p className="instruction">
          {msg("emailVerifyInstruction2")}
          <br />
          <a className="instruction-resend" href={url.loginAction}>
            {msg("doClickHere")}
          </a>
          &nbsp;
          {msg("emailVerifyInstruction3")}
        </p> */}

        {/* <a className="instruction-back-login" href={url?.loginRestartFlowUrl}>
          Back to Login
        </a> */}

      <a className="w-full h-[48px] rounded-lg p-2 bg-gradient-to-r from-[#6CE7E4] to-[#8F4AE3] flex items-center justify-center" href={url?.loginRestartFlowUrl}>
          <p style={{fontFamily: "Inter",fontSize: "16px",fontWeight: "600",lineHeight: "23.2px",textAlign: "left",color:"#000000"}}>
              Resent Email
          </p>
      </a>
      </div>
    </Template>
  );
}
