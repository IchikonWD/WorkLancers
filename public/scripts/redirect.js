redirectTime = "2500";
redirectURL = "/";
function timedRedirect() {
    setTimeout("location.href = redirectURL;",redirectTime);
}
timedRedirect();