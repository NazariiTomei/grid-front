import { clsx } from "keycloakify/tools/clsx";
import type { PageProps } from "keycloakify/login/pages/PageProps";
import { useGetClassName } from "keycloakify/login/lib/useGetClassName";
import type { KcContext } from "../kcContext";
import type { I18n } from "../i18n";

export default function LoginResetPassword(
  props: PageProps<
    Extract<KcContext, { pageId: "login-reset-password.ftl" }>,
    I18n
  >
) {
  const { kcContext, i18n, doUseDefaultCss, Template, classes } = props;

  const { getClassName } = useGetClassName({
    doUseDefaultCss,
    classes,
  });

  const { url, realm, auth } = kcContext;

  const { msg, msgStr } = i18n;

  return (
    <Template
      {...{ kcContext, i18n, doUseDefaultCss, classes }}
      displayMessage={false}
      headerNode="Forgot Password"
      infoNode={msg("emailInstruction")}
    >
      <form
        id="kc-reset-password-form"
        className={getClassName("kcFormClass")}
        action={url.loginAction}
        method="post"
        style={{color:"white"}}
      >
        <div className={getClassName("kcFormGroupClass")}>
          <div className={getClassName("kcLabelWrapperClass")} style={{textAlign:"left", paddingTop:"20px"}}>
            <label htmlFor="username" className={getClassName("kcLabelClass")} style={{color:"white"}}>
              {!realm.loginWithEmailAllowed
                ? msg("username")
                : !realm.registrationEmailAsUsername
                ? msg("usernameOrEmail")
                : msg("email")}
            </label>
          </div>
          <div className={getClassName("kcInputWrapperClass")} style={{paddingBottom:"25px", paddingTop:"10px"}}>
            <input
              type="text"
              id="username"
              name="username"
              className={`${getClassName("kcInputClass")} w-full h-12 px-4 py-2 rounded-md bg-[#1E2C3C] text-[#FFFFFF8F] font-normal text-base border border-transparent focus:outline-none focus:ring-2 focus:ring-[#8F4AE3]`}
              autoFocus
              defaultValue={
                auth !== undefined && auth.showUsername
                  ? auth.attemptedUsername
                  : undefined
              }
              placeholder="Enter your email"
              style={{borderColor: "transparent"}}
            />
          </div>
        </div>
        <div
          className={clsx(
            getClassName("kcFormGroupClass"),
            getClassName("kcFormSettingClass")
          )}
        >
          {/* <div
            id="kc-form-options"
            className={getClassName("kcFormOptionsClass")}
          >
            <div className={getClassName("kcFormOptionsWrapperClass")}>
              <span>
                <a href={url.loginUrl}>{msg("backToLogin")}</a>
              </span>
            </div>
          </div> */}

          {/* <div
            id="kc-form-buttons"
            className={getClassName("kcFormButtonsClass")}
          >
            <input
              className={clsx(
                getClassName("kcButtonClass"),
                getClassName("kcButtonPrimaryClass"),
                getClassName("kcButtonBlockClass"),
                getClassName("kcButtonLargeClass")
              )}
              type="submit"
              value={msgStr("doSubmit")}
            />
          </div> */}
          <button className="w-full h-[48px] rounded-lg p-2 bg-gradient-to-r from-[#6CE7E4] to-[#8F4AE3] flex items-center justify-center" type="submit">
              <p style={{fontFamily: "Inter",fontSize: "16px",fontWeight: "600",lineHeight: "23.2px",textAlign: "left",color:"#000000"}}>
                  Send Recovery Link
              </p>
          </button>
        </div>
      </form>
    </Template>
  );
}
