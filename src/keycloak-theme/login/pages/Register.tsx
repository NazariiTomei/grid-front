// ejected using 'npx eject-keycloak-page'
import { clsx } from "keycloakify/tools/clsx";
import type { PageProps } from "keycloakify/login/pages/PageProps";
import { useGetClassName } from "keycloakify/login/lib/useGetClassName";
import type { KcContext } from "../kcContext";
import type { I18n } from "../i18n";

export default function Register(props: PageProps<Extract<KcContext, { pageId: "register.ftl" }>, I18n>) {
    const { kcContext, i18n, doUseDefaultCss, Template, classes } = props;

    const { getClassName } = useGetClassName({
        doUseDefaultCss,
        classes
    });

    const { url, messagesPerField, register, realm, passwordRequired, recaptchaRequired, recaptchaSiteKey } = kcContext;

    const { msg, msgStr } = i18n;

    return (
        <Template {...{ kcContext, i18n, doUseDefaultCss, classes }} headerNode="Sign Up" subtitle="Let’s begin the adventure" footer={true}>
            <form id="kc-register-form" className={getClassName("kcFormClass")} action={url.registrationAction} method="post" style={{color:"white"}}>
                {/* <div
                    className={clsx(
                        getClassName("kcFormGroupClass"),
                        messagesPerField.printIfExists("firstName", getClassName("kcFormGroupErrorClass"))
                    )}
                >
                    <div className={getClassName("kcLabelWrapperClass")} style={{textAlign:"left"}}>
                        <label htmlFor="firstName" className={`${getClassName("kcLabelClass")} text-[white]`}>
                            {msg("firstName")}
                        </label>
                    </div>
                    <div className={getClassName("kcInputWrapperClass")} style={{textAlign:"left"}}>
                        <input
                            type="text"
                            id="firstName"
                            className={`${getClassName("kcInputClass")} w-full h-12 px-4 py-2 rounded-md bg-[#1E2C3C] text-[#FFFFFF8F] font-normal text-base border border-transparent focus:outline-none focus:ring-2 focus:ring-[#8F4AE3]`}
                            name="firstName"
                            defaultValue={register.formData.firstName ?? ""}

                        />
                    </div>
                </div>

                <div
                    className={clsx(
                        getClassName("kcFormGroupClass"),
                        messagesPerField.printIfExists("lastName", getClassName("kcFormGroupErrorClass"))
                    )}
                    style={{textAlign:"left"}}
                >
                    <div className={getClassName("kcLabelWrapperClass")}>
                        <label htmlFor="lastName" className={`${getClassName("kcLabelClass")} text-[white]`}>
                            {msg("lastName")}
                        </label>
                    </div>
                    <div className={getClassName("kcInputWrapperClass")}>
                        <input
                            type="text"
                            id="lastName"
                            className={`${getClassName("kcInputClass")} w-full h-12 px-4 py-2 rounded-md bg-[#1E2C3C] text-[#FFFFFF8F] font-normal text-base border border-transparent focus:outline-none focus:ring-2 focus:ring-[#8F4AE3]`}
                            name="lastName"
                            defaultValue={register.formData.lastName ?? ""}
                        />
                    </div>
                </div> */}

                <div
                    className={clsx(getClassName("kcFormGroupClass"), messagesPerField.printIfExists("email", getClassName("kcFormGroupErrorClass")))}
                    style={{textAlign:"left", paddingTop:"10px"}}
                >
                    <div className={getClassName("kcLabelWrapperClass")} style={{paddingBottom:"10px"}}>
                        <label htmlFor="email" className={`${getClassName("kcLabelClass")} text-[white]`}>
                            {msg("email")}
                        </label>
                    </div>
                    <div className={getClassName("kcInputWrapperClass")} style={{paddingBottom:"15px"}}>
                        <input
                            type="text"
                            id="email"
                            className={`${getClassName("kcInputClass")} w-full h-12 px-4 py-2 rounded-md bg-[#1E2C3C] text-[#FFFFFF8F] font-normal text-base border border-transparent focus:outline-none focus:ring-2 focus:ring-[#8F4AE3]`}
                            name="email"
                            defaultValue={register.formData.email ?? ""}
                            autoComplete="email"
                            placeholder="Enter your email"
                            style={{borderColor: "transparent"}}
                        />
                    </div>
                </div>
                {!realm.registrationEmailAsUsername && (
                    <div
                        className={clsx(
                            getClassName("kcFormGroupClass"),
                            messagesPerField.printIfExists("username", getClassName("kcFormGroupErrorClass"))
                        )}
                    >
                        <div className={getClassName("kcLabelWrapperClass")} style={{paddingBottom:"10px"}}>
                            <label htmlFor="username" className={`${getClassName("kcLabelClass")} text-[white]`}>
                                {msg("username")}
                            </label>
                        </div>
                        <div className={getClassName("kcInputWrapperClass")} style={{paddingBottom:"15px"}}>
                            <input
                                type="text"
                                id="username"
                                className={`${getClassName("kcInputClass")} w-full h-12 px-4 py-2 rounded-md bg-[#1E2C3C] text-[#FFFFFF8F] font-normal text-base border border-transparent focus:outline-none focus:ring-2 focus:ring-[#8F4AE3]`}
                                name="username"
                                defaultValue={register.formData.username ?? ""}
                                autoComplete="username"
                                style={{borderColor: "transparent"}}
                            />
                        </div>
                    </div>
                )}
                {passwordRequired && (
                    <>
                        <div
                            className={clsx(
                                getClassName("kcFormGroupClass"),
                                messagesPerField.printIfExists("password", getClassName("kcFormGroupErrorClass"))
                            )}
                            style={{textAlign:'left'}}
                        >
                            <div className={getClassName("kcLabelWrapperClass")} style={{paddingBottom:"10px"}}> 
                                <label htmlFor="password" className={`${getClassName("kcLabelClass")} text-[white]`}>
                                    {msg("password")}
                                </label>
                            </div>
                            <div className={getClassName("kcInputWrapperClass")} style={{paddingBottom:"15px"}}>
                                <input
                                    type="password"
                                    id="password"
                                    className={`${getClassName("kcInputClass")} w-full h-12 px-4 py-2 rounded-md bg-[#1E2C3C] text-[#FFFFFF8F] font-normal text-base border border-transparent focus:outline-none focus:ring-2 focus:ring-[#8F4AE3]`}
                                    name="password"
                                    autoComplete="new-password"
                                    style={{borderColor: "transparent"}}
                                    placeholder="Enter your password"
                                />
                            </div>
                        </div>

                        <div
                            className={clsx(
                                getClassName("kcFormGroupClass"),
                                messagesPerField.printIfExists("password-confirm", getClassName("kcFormGroupErrorClass"))
                            )}
                            style={{textAlign:'left'}}
                        >
                            <div className={getClassName("kcLabelWrapperClass")} style={{paddingBottom:"10px"}}>
                                <label htmlFor="password-confirm" className={`${getClassName("kcLabelClass")} text-[white]`}>
                                    {msg("passwordConfirm")}
                                </label>
                            </div>
                            <div className={getClassName("kcInputWrapperClass")} style={{paddingBottom:"15px"}}>  
                                <input type="password" style={{borderColor: "transparent"}} id="password-confirm" className={`${getClassName("kcInputClass")} w-full h-12 px-4 py-2 rounded-md bg-[#1E2C3C] text-[#FFFFFF8F] font-normal text-base border border-transparent focus:outline-none focus:ring-2 focus:ring-[#8F4AE3]`} name="password-confirm" placeholder="Enter confirm password"/>
                            </div>
                        </div>
                    </>
                )}
                <div
                    className={clsx(getClassName("kcFormGroupClass"), messagesPerField.printIfExists("email", getClassName("kcFormGroupErrorClass")))}
                    style={{textAlign:"left"}}
                >
                    <div className={getClassName("kcLabelWrapperClass")} style={{paddingBottom:"10px"}}>
                        <label htmlFor="referral" className={`${getClassName("kcLabelClass")} text-[white]`}>
                            Referral Code
                        </label>
                    </div>
                    <div className={getClassName("kcInputWrapperClass")} >
                        <input
                            type="text"
                            id="referral"
                            className={`${getClassName("kcInputClass")} w-full h-12 px-4 py-2 rounded-md bg-[#1E2C3C] text-[#FFFFFF8F] font-normal text-base border border-transparent focus:outline-none focus:ring-2 focus:ring-[#8F4AE3]`}
                            name="referral"
                            // defaultValue={register.formData.referral ?? ""}
                            autoComplete="referral"
                            placeholder="Enter referral code"
                            style={{borderColor: "transparent"}}
                        />
                    </div>
                    
                </div>
                
                {recaptchaRequired && (
                    <div className="form-group">
                        <div className={getClassName("kcInputWrapperClass")}>
                            <div className="g-recaptcha" data-size="compact" data-sitekey={recaptchaSiteKey}></div>
                        </div>
                    </div>
                )}
                <div className={getClassName("kcFormGroupClass")}>
                    {/* <div id="kc-form-options" className={getClassName("kcFormOptionsClass")}>
                        <div className={getClassName("kcFormOptionsWrapperClass")}>
                            <span>
                                <a href={url.loginUrl}>{msg("backToLogin")}</a>
                            </span>
                        </div>
                    </div> */}
                    <div className="flex flex-row items-center justify-between w-full mb-4 space-x-2" style={{padding:"20px 0px 20px 0px"}}>
                        <p style={{fontFamily:"Inter",fontSize: "16px",fontWeight: "400",lineHeight: "28px",textAlign: "left",color:"#FFFFFF"}}>
                            Already have an account? 
                        </p>
                        <a style={{fontFamily:"Inter",fontSize: "16px",fontWeight: "600",lineHeight: "28px",textAlign: "left", color:"#8F4DE3"}} href={url.loginUrl}>
                            <u>Login</u>
                        </a>
                    </div>
                    <div className="flex flex-row items-center justify-start w-full mb-4" style={{padding:"0px 0px 20px 0px"}}>
                        <input
                            type="checkbox"
                            id="custom-checkbox"
                            className="h-5 w-5 appearance-none bg-dark rounded-lg border border-[#8F4AE3] checked:bg-blue-600 checked:border-transparent focus:outline-none"
                            />
                       <label
                            htmlFor="custom-checkbox"
                            className="font-Inter text-base text-[#FFFFFF] leading-6"
                            style={{paddingLeft:"10px"}}
                            >
                            I agree to the terms & conditions
                        </label>
                    </div>
                    {/* <div id="kc-form-buttons" className={getClassName("kcFormButtonsClass")}>
                        <input
                            className={clsx(
                                getClassName("kcButtonClass"),
                                getClassName("kcButtonPrimaryClass"),
                                getClassName("kcButtonBlockClass"),
                                getClassName("kcButtonLargeClass")
                            )}
                            type="submit"
                            value={msgStr("doRegister")}
                        />
                    </div> */}
                    <button className="w-full h-[48px] rounded-lg p-2 bg-gradient-to-r from-[#6CE7E4] to-[#8F4AE3] flex items-center justify-center" type="submit">
                        <p style={{fontFamily: "Inter",fontSize: "16px",fontWeight: "600",lineHeight: "23.2px",textAlign: "left",color:"#000000"}}>
                            Register Now
                        </p>
                    </button>
                </div>
            </form>
            
        </Template>
    );
}
