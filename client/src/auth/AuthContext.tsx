import React, {createContext, ReactNode, useEffect, useState} from 'react';
import SplashScreen from "@/components/common/SplashScreen.tsx";
import {useSnackbar} from "notistack";

interface AuthContextType {
    auth: any;
}

interface Props {
    children: ReactNode;
}

export const AuthContext = createContext<AuthContextType | null>(null);

function Loading() {
    return <SplashScreen loading={''}/>;
}

function LoadingError() {
    return <SplashScreen loading={'Error loading'}/>;
}

export function AuthContextProvider({children}: Props) {
    const [auth, setAuth] = useState<any | undefined>(undefined);
    const { enqueueSnackbar } = useSnackbar();

    useEffect(() => {
        const onAuthChanged = (e: Event) => {
            const detail = (e as CustomEvent).detail;
            setAuth((prevAuth: any) => {
                if (typeof prevAuth === 'undefined') {
                    console.log('Authentication status loaded', detail);
                } else {
                    if (detail?.meta.is_authenticated === false && Array.isArray(detail?.data?.flows)) {
                        const pending: string[] = []
                        detail.data.flows.forEach((flow: { [key: string]: any }) => {
                            if (flow.is_pending === true) {
                                if (flow.id === 'verify_email') {
                                    pending.push(`Please verify your email`)
                                } else {
                                    pending.push(`${flow.id} is pending`)
                                }
                            }
                        })
                        if (pending.length > 0) {
                            enqueueSnackbar(pending.join(', \n'))
                        }

                    }
                    // check if something is pending !
                    console.log('Authentication status updated', detail);
                }
                return detail;
            });
        };

        document.addEventListener('allauth.auth.change', onAuthChanged);

        if (typeof localStorage.getItem('fvlogin') === 'string') {
            const data = JSON.parse(localStorage.getItem('fvlogin') as string);
            setAuth(data)
        } else {
            setAuth(false);
        }

        return () => {
            document.removeEventListener('allauth.auth.change', onAuthChanged);
        };
    }, []);

    const loading = (typeof auth === 'undefined');

    return (
        <AuthContext.Provider value={{auth}}>
            {loading ? <Loading/> : (auth === false ? <LoadingError/> : children)}
        </AuthContext.Provider>
    );
}
