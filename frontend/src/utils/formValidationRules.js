const MIN_PASSWORD_LENGTH = 8

export const requiredRule = (value) => {
    if (value) return true
    return "Campo obrigatório"
}

export const emailRule = [
    requiredRule,
    (v) => (/^\S+@\S+\.\S+$/.test(v)) || "Insira um e-mail válido.",
]

export const passwordLengthRule = [
    requiredRule,
    (v) => (v.length >= MIN_PASSWORD_LENGTH) || `A senha deve ter no mínimo ${MIN_PASSWORD_LENGTH} dígitos.`,
]

export const passwordConfirmationRule = [
    requiredRule,
    (v, pw) => v === pw || "As senhas devem ser iguais."
]

export const positiveBalanceRule = [
    (v) => parseFloat(v) > 0 || 'O valor deve ser um número positivo',
]
