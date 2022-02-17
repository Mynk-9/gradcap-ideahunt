// thanks: https://github.com/Sivanesh-S/react-google-authentication/blob/master/src/utils/refreshToken.js

export const refreshTokenSetup = (res, serverCallback, email) => {
    // Timing to renew access token
    let refreshTiming = (res.tokenObj.expires_in || 3600 - 5 * 60) * 1000;

    const refreshToken = async () => {
        // get refresh token
        const newAuthRes = await res.reloadAuthResponse();
        refreshTiming = (newAuthRes.expires_in || 3600 - 5 * 60) * 1000;

        // update the server
        serverCallback(
            {
                tokenObj: { ...newAuthRes },
                profileObj: { email: email },
            },
            true
        );

        // Setup the other timer after the first one
        setTimeout(refreshToken, refreshTiming);
    };

    // Setup first refresh timer
    setTimeout(refreshToken, refreshTiming);
};
