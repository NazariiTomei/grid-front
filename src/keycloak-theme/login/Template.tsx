// Copy pasted from: https://github.com/InseeFrLab/keycloakify/blob/main/src/login/Template.tsx

import { assert } from "keycloakify/tools/assert";
import { clsx } from "keycloakify/tools/clsx";
import { usePrepareTemplate } from "keycloakify/lib/usePrepareTemplate";
import { type TemplateProps } from "keycloakify/login/TemplateProps";
import { useGetClassName } from "keycloakify/login/lib/useGetClassName";
import type { KcContext } from "./kcContext";
import type { I18n } from "./i18n";
import logo from './assets/logo.png';
import { title } from "process";
import { ReactNode } from "react";

interface ExtendedTemplateProps extends TemplateProps<KcContext, I18n> {
  footer?: boolean;
  subtitle?: ReactNode;
}

export default function Template(props: TemplateProps<KcContext, I18n>) {
  const {
    displayInfo = false,
    displayMessage = true,
    displayRequiredFields = false,
    displayWide = false,
    showAnotherWayIfPresent = true,
    headerNode,
    showUsernameNode = null,
    infoNode = null,
    footer = false,
    subtitle = null,
    kcContext,
    i18n,
    doUseDefaultCss,
    classes,
    children,
  } = props;

  const { getClassName } = useGetClassName({ doUseDefaultCss, classes });

  const { msg, changeLocale, labelBySupportedLanguageTag, currentLanguageTag } =
    i18n;

  const { realm, locale, auth, url, message, isAppInitiatedAction } = kcContext;

  const { isReady } = usePrepareTemplate({
    doFetchDefaultThemeResources: doUseDefaultCss,
    url,
    stylesCommon: ["lib/zocial/zocial.css"],
    styles: ["css/login.css"],
    htmlClassName: getClassName("kcHtmlClass"),
    bodyClassName: undefined,
  });

  if (!isReady) {
    return null;
  }

  return (
    <div className="w-full max-w-[607px] p-4 md:p-8">
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#040b15] px-4 py-8 ">
      
      <div id="kc-header" className={getClassName("kcHeaderClass")}>
        {/* <div
          id="kc-header-wrapper"
          className={getClassName("kcHeaderWrapperClass")}
        >
          {msg("loginTitleHtml", realm.displayNameHtml)}
        </div> */}
        {
          // img rocket logo
        }
      </div>

      <div className="w-full max-w-lg bg-[#111A26] p-8 rounded-lg space-y-8 z-[1]">
        <header className={getClassName("kcFormHeaderClass")}>
          {realm.internationalizationEnabled &&
            (assert(locale !== undefined), true) &&
            locale.supported.length > 1 && (
              <div id="kc-locale">
                <div
                  id="kc-locale-wrapper"
                  className={getClassName("kcLocaleWrapperClass")}
                >
                  <div className="kc-dropdown" id="kc-locale-dropdown">
                    {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                    <a href="#" id="kc-current-locale-link">
                      {labelBySupportedLanguageTag[currentLanguageTag]}
                    </a>
                    <ul>
                      {locale.supported.map(({ languageTag }) => (
                        <li key={languageTag} className="kc-dropdown-item">
                          {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                          <a href="#" onClick={() => changeLocale(languageTag)}>
                            {labelBySupportedLanguageTag[languageTag]}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            )}
          {!(
            auth !== undefined &&
            auth.showUsername &&
            !auth.showResetCredentials
          ) ? (
            displayRequiredFields ? (
              <div className={getClassName("kcContentWrapperClass")}>
                <div
                  className={`${clsx(
                    getClassName("kcLabelWrapperClass"),
                    "subtitle"
                  )}`}
                >
                  <span className="subtitle">
                    <span className="required">*</span>
                    {msg("requiredFields")}
                  </span>
                </div>
                <div className="col-md-10">
                  <h1 id="kc-page-title">{headerNode}</h1>
                </div>
              </div>
            ) : (
              <>
                <h1 style={{color:"#FFFFFF", fontFamily:"Inter sans-serif", fontSize:"48px", fontWeight:"600", lineHeight:"62.4px", textAlign: "left"}}>{headerNode}</h1>
                {
                  subtitle && (
                    <p style={{width:"100%", fontFamily: "Inter sans-serif",fontSize: "20px",fontWeight: "400",lineHeight: "26px",textAlign: "left", color:"#FFFFFF8F", padding:"20px 0px 20px 0px"}}>
                      {subtitle}
                    </p>
                  )
                }
              </>
            )
          ) : displayRequiredFields ? (
            <div className={getClassName("kcContentWrapperClass")}>
              <div
                className={clsx(
                  getClassName("kcLabelWrapperClass"),
                  "subtitle"
                )}
              >
                <span className="subtitle">
                  <span className="required">*</span> {msg("requiredFields")}
                </span>
              </div>
              <div className="col-md-10">
                {showUsernameNode}
                <div className={getClassName("kcFormGroupClass")}>
                  <div id="kc-username">
                    <label id="kc-attempted-username">
                      {auth?.attemptedUsername}
                    </label>
                    <a id="reset-login" href={url.loginRestartFlowUrl}>
                      <div className="kc-login-tooltip">
                        <i className={getClassName("kcResetFlowIcon")}></i>
                        <span className="kc-tooltip-text">
                          {msg("restartLoginTooltip")}
                        </span>
                      </div>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <>
              {showUsernameNode}
              <div className={getClassName("kcFormGroupClass")}>
                <div id="kc-username">
                  <label id="kc-attempted-username">
                    {auth?.attemptedUsername}
                  </label>
                  <a id="reset-login" href={url.loginRestartFlowUrl}>
                    <div className="kc-login-tooltip">
                      <i className={getClassName("kcResetFlowIcon")}></i>
                      <span className="kc-tooltip-text">
                        {msg("restartLoginTooltip")}
                      </span>
                    </div>
                  </a>
                </div>
              </div>
            </>
          )}
        </header>
        <div id="kc-content">
          <div >
            {/* App-initiated actions should not see warning messages about the need to complete the action during login. */}
            {displayMessage &&
              message !== undefined &&
              (message.type !== "warning" || !isAppInitiatedAction) && (
                <div style={{width:"100%",borderRadius: "0.25rem",backgroundColor: "rgb(255 0 0 / var(--tw-bg-opacity)) !important",padding: "0.5rem !important",fontSize: "0.75rem !important",lineHeight: "1rem !important"}}>
                  {message.type === "success" && (
                    <span
                      className={getClassName("kcFeedbackSuccessIcon")}
                    ></span>
                  )}
                  {message.type === "warning" && (
                    <span
                      className={getClassName("kcFeedbackWarningIcon")}
                    ></span>
                  )}
                  {message.type === "error" && (
                    <span
                      className={getClassName("kcFeedbackErrorIcon")}
                    ></span>
                  )}
                  {message.type === "info" && (
                    <span className={getClassName("kcFeedbackInfoIcon")}></span>
                  )}
                  <span
                    className="kc-feedback-text"
                    dangerouslySetInnerHTML={{
                      __html: message.summary,
                    }}
                  />
                </div>
              )}
            {children}
            {auth !== undefined &&
              auth.showTryAnotherWayLink &&
              showAnotherWayIfPresent && (
                <form
                  id="kc-select-try-another-way-form"
                  action={url.loginAction}
                  method="post"
                  className={clsx(
                    displayWide && getClassName("kcContentWrapperClass")
                  )}
                >
                  <div
                    className={clsx(
                      displayWide && [
                        getClassName("kcFormSocialAccountContentClass"),
                        getClassName("kcFormSocialAccountClass"),
                      ]
                    )}
                  >
                    <div className={getClassName("kcFormGroupClass")}>
                      <input type="hidden" name="tryAnotherWay" value="on" />
                      {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                      <a
                        href="#"
                        id="try-another-way"
                        onClick={() => {
                          document.forms[
                            "kc-select-try-another-way-form" as never
                          ].submit();
                          return false;
                        }}
                      >
                        {msg("doTryAnotherWay")}
                      </a>
                    </div>
                  </div>
                </form>
              )}
            {/* {displayInfo && (
              <div id="kc-info" className={getClassName("kcSignUpClass")}>
                <div
                  id="kc-info-wrapper"
                  className={getClassName("kcInfoAreaWrapperClass")}
                >
                  {infoNode}
                </div>
              </div>
            )} */}
          </div>
        </div>
        
      </div>
      {
        footer && (<div className="footer w-[160%] h-[46px] text-center text-[#ffffff8f] pt-[50px] px-4">
          By creating an account, you agree to the{" "}
          <span className="text-[#8f4ee3]">Terms of Service</span>. For more
          information about Grass privacy practices, see the{" "}
          <span className="text-[#8f4ee3]">Privacy Policy</span>. We’ll occasionally
          send you account-related emails.
      </div>)
      }
    </div>
    </div>

  );
}
