import { roboto } from "../fonts";

const ConnectWallet = (props: any) => {
    return (
        <button
            className={`w-[12.5rem] h-14 grid py-2 px-[1.25rem]
          place-items-center rounded-2xl gap-2 text-textPrimary
          font-medium text-base bg-primary ${roboto.variable} font-roboto`}
            {...props}
        >
            CONNECT WALLET
        </button>
    );
};

export default ConnectWallet;
