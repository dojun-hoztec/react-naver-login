import * as React from 'react';
export interface NaverUser {
    email: string;
    name: string;
    id: string;
    profile_image: string;
    age?: string;
    birthday?: string;
    gender?: string;
    nickname?: string;
}
interface IProps {
    clientId: string;
    callbackUrl: string;
    callbackHandle: boolean;
    render: (props: any) => React.ComponentElement<any, any> | Element | JSX.Element;
    onSuccess: (result: NaverUser) => void;
    onFailure: () => void;
}
declare class LoginNaver extends React.Component<IProps> {
    componentDidMount(): void;
    render(): React.ComponentElement<any, any> | Element | JSX.Element;
}
export default LoginNaver;
