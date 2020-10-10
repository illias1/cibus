export const LOCAL_STORAGE_CART = "local_storage_cart";
export const LOCAL_STORAGE_ORDERS = "local_storage_orders";
export const LOCAL_STORAGE_CUSTOMER_NAME = "local_storage_customer_name";

export const IMAGE_OVERLAY_COLOR = "rgba(0,0,0,0.83)";
export const UNCATEGORIZED = "uncategorized";

export const NO_TRANSLATE = " notranslate";

export const isPlatform = {
  Windows: function () {
    return /IEMobile/i.test(navigator.userAgent);
  },
  Android: function () {
    return /Android/i.test(navigator.userAgent);
  },
  BlackBerry: function () {
    return /BlackBerry/i.test(navigator.userAgent);
  },
  iOS: function () {
    return /iPhone|iPad|iPod/i.test(navigator.userAgent);
  },
  any: function () {
    return (
      isPlatform.Android() || isPlatform.BlackBerry() || isPlatform.iOS() || isPlatform.Windows()
    );
  },
};
