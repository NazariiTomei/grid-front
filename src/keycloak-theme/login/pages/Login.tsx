// ejected using 'npx eject-keycloak-page'
import { useState, type FormEventHandler } from "react";
import { clsx } from "keycloakify/tools/clsx";
import { useConstCallback } from "keycloakify/tools/useConstCallback";
import type { PageProps } from "keycloakify/login/pages/PageProps";
import { useGetClassName } from "keycloakify/login/lib/useGetClassName";
import type { KcContext } from "../kcContext";
import type { I18n } from "../i18n";
import { to } from "evt";

export default function Login(props: PageProps<Extract<KcContext, { pageId: "login.ftl" }>, I18n>) {
    const { kcContext, i18n, doUseDefaultCss, Template, classes } = props;

    const { getClassName } = useGetClassName({
        doUseDefaultCss,
        classes
    });

    const { social, realm, url, usernameEditDisabled, login, auth, registrationDisabled } = kcContext;

    const { msg, msgStr } = i18n;

    const [isLoginButtonDisabled, setIsLoginButtonDisabled] = useState(false);

    const onSubmit = useConstCallback<FormEventHandler<HTMLFormElement>>(e => {
        e.preventDefault();

        setIsLoginButtonDisabled(true);

        const formElement = e.target as HTMLFormElement;

        //NOTE: Even if we login with email Keycloak expect username and password in
        //the POST request.
        formElement.querySelector("input[name='email']")?.setAttribute("name", "username");

        formElement.submit();
    });

    return (
        <Template
            {...{ kcContext, i18n, doUseDefaultCss, classes }}
            displayInfo={social.displayInfo}
            // displayWide={realm.password && social.providers !== undefined}
            headerNode="Welcome to Grid!"
            subtitle="Let’s begin the adventure"
        >
            <div className={`${clsx(realm.password && social.providers !== undefined && getClassName("kcContentWrapperClass"))}`}>
                <div
                    className={clsx(
                        realm.password &&
                            social.providers && [getClassName("kcFormSocialAccountContentClass"), getClassName("kcFormSocialAccountClass")]
                    )}
                >
                    {realm.password && (
                        <form onSubmit={onSubmit} action={url.loginAction} method="post">
                            <div style={{ textAlign: "left", fontFamily: "Inter", color: '#FFFFFF' }}>
                                {(() => {
                                    const label = !realm.loginWithEmailAllowed
                                        ? "username"
                                        : realm.registrationEmailAsUsername
                                            ? "email"
                                            : "usernameOrEmail";

                                    const autoCompleteHelper: typeof label = label === "usernameOrEmail" ? "username" : label;

                                    return (
                                        <>
                                            <div style={{ padding: "15px 0px 10px 0px" }}>
                                                <label htmlFor={autoCompleteHelper} className={getClassName("kcLabelClass")} style={{ color: "#FFFFFF" }}>
                                                    {msg(label)}
                                                </label>
                                            </div>
                                            <div style={{ paddingBottom: "15px" }}>
                                                <input
                                                    tabIndex={1}
                                                    id={autoCompleteHelper}
                                                    className="w-full h-12 px-4 py-2 rounded-md bg-[#1E2C3C] text-[#FFFFFF8F] font-normal text-base border border-transparent focus:outline-none focus:ring-2 focus:ring-[#8F4AE3] pt-[4]"
                                                    //NOTE: This is used by Google Chrome auto fill so we use it to tell
                                                    //the browser how to pre fill the form but before submit we put it back
                                                    //to username because it is what keycloak expects.
                                                    name={autoCompleteHelper}
                                                    defaultValue={login.username ?? ""}
                                                    type="text"
                                                    placeholder="Enter your email"
                                                    {...(usernameEditDisabled
                                                        ? { "disabled": true }
                                                        : {
                                                            "autoFocus": true,
                                                            "autoComplete": "off"
                                                        })}
                                                />
                                            </div>
                                        </>
                                    );
                                })()}
                            </div>
                            <div className={clsx(getClassName("kcFormGroupClass"))} style={{ textAlign: 'left' }}>
                                <div className={getClassName("kcFormGroupClass")} style={{ textAlign: "left", paddingBottom: "10px" }}>
                                    <label htmlFor="password" className={getClassName("kcLabelClass")} style={{ color: "#FFFFFF" }}>
                                        {msg("password")}
                                    </label>
                                </div>
                                <div className={getClassName("kcInputWrapperClass")}>
                                    <input
                                        tabIndex={2}
                                        id="password"
                                        className="w-full h-12 px-4 py-2 rounded-md bg-[#1E2C3C] text-[#FFFFFF8F] font-normal text-base border border-transparent focus:outline-none focus:ring-2 focus:ring-[#8F4AE3]"
                                        name="password"
                                        type="password"
                                        placeholder="Enter Password"
                                        autoComplete="off"
                                    />
                                </div>
                            </div>
                            <div className="flex flex-row items-center justify-between w-full mb-4 space-x-2" style={{ padding: "20px 0 20px 0px" }}>
                                <p style={{ fontFamily: "Inter", fontSize: "16px", fontWeight: "400", lineHeight: "28px", textAlign: "left", color: "#FFFFFF" }}>
                                    Don't have an account?
                                </p>
                                <a style={{ fontFamily: "Inter", fontSize: "16px", fontWeight: "600", lineHeight: "28px", textAlign: "left", color: "#8F4DE3" }} href={url.registrationUrl}>
                                    <u>Sign Up</u>
                                </a>
                            </div>
                            <button className="w-full h-[48px] rounded-lg p-2 bg-gradient-to-r from-[#6CE7E4] to-[#8F4AE3] flex items-center justify-center" disabled={isLoginButtonDisabled} type="submit">
                                <p style={{ fontFamily: "Inter", fontSize: "16px", fontWeight: "600", lineHeight: "23.2px", textAlign: "left", color: "#000000" }}>
                                    Access My Account
                                </p>
                            </button>
                        </form>
                    )}
                </div>
                {realm.password && social.providers !== undefined && (
                    <div id="kc-social-providers" className={clsx(getClassName("kcFormSocialAccountContentClass"), getClassName("kcFormSocialAccountClass"))}>
                        <ul className={clsx(getClassName("kcFormSocialAccountListClass"), social.providers.length > 4 && getClassName("kcFormSocialAccountDoubleListClass"))}>
                            {social.providers.map(p => (
                                <li key={p.providerId} className={getClassName("kcFormSocialAccountListLinkClass")}>
                                    <a href={p.loginUrl} id={`zocial-${p.alias}`} className={clsx("zocial", p.providerId)}>
                                        <span>{p.displayName}</span>
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
            </div>
        </Template>
    );
}
