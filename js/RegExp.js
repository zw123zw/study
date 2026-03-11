// 手机号正则表达式
const phoneRegex = /^1[3-9]\d{9}$/;

/**
 * 校验手机号是否合法
 * @param {string} phone - 要校验的手机号
 * @returns {boolean} - 校验结果，true表示合法，false表示不合法
 */
function validatePhone(phone) {
    if (typeof phone !== 'string') {
        return false;
    }
    return phoneRegex.test(phone);
}

// 导出正则和校验函数
export { phoneRegex, validatePhone };