
  
    // Expressão regular para validar e-mail
    export const emailRegex = /^((?!\.)[\w\-_.]*[^.])(@\w+)(\.\w+(\.\w+)?[^.\W])$/;

    // Expressão regular que verifica se a senha possui pelo menos uma letra maiúscula, um número e 6 caracteres

    export const passwordRegex = /^(?=.*[A-Z])(?=.*\d).{6,}$/;

    // Verifica se o e-mail está em um formato válido
    export const isValidEmail = (email) => {
    return emailRegex.test(email);
    };

    export const isValidPassword = (password) => {
    return passwordRegex.test(password);
    };

    // Função para aplicar máscara de telefone
    export const applyPhoneMask = (value) => {
        // Remove todos os caracteres não numéricos
        const numbers = value.replace(/\D/g, '');
        
        // Limita a 11 dígitos (2 para DDD + 9 para número)
        const limitedNumbers = numbers.slice(0, 11);
        
        if (limitedNumbers.length <= 2) {
        return limitedNumbers;
        } else if (limitedNumbers.length <= 6) {
        return `(${limitedNumbers.slice(0, 2)})${limitedNumbers.slice(2)}`;
        } else if (limitedNumbers.length <= 10) {
        // Formato (DD)nnnn-nnnn para números com 8 dígitos
        return `(${limitedNumbers.slice(0, 2)})${limitedNumbers.slice(2, 6)}-${limitedNumbers.slice(6)}`;
        } else {
        // Formato (DD)nnnnn-nnnn para números com 9 dígitos
        return `(${limitedNumbers.slice(0, 2)})${limitedNumbers.slice(2, 7)}-${limitedNumbers.slice(7)}`;
        }
    };

    // Função para validar nome
    export const validateName = (nameValue, setNameError) => {
        if (!nameValue.trim()) {
        setNameError('Nome é obrigatório');
        return false;
        } else if (nameValue.trim().length < 2) {
        setNameError('Nome deve ter pelo menos 2 caracteres');
        return false;
        } else {
        setNameError('');
        return true;
        }
    };
  
  // Função para validar email opcional
  export const validateEmailOptional = (emailValue, setEmailError) => {
    // Se estiver vazio, aceita 
    if (!emailValue.trim()) {
      setEmailError('');
      return true;
    }
  
    // Se digitou algo, aplica a regex normalmente
    if (emailRegex.test(emailValue)) {
      setEmailError('Email deve ter um formato válido');
      return false;
    } else {
      setEmailError('');
      return true;
    }
  };
  
  // Função para validar telefone opcional
  export const validatePhoneOptional = (phoneValue, setPhoneError) => {
    // Remove caracteres não numéricos para checar o tamanho
    const numbers = phoneValue.replace(/\D/g, '');
  
    // Se estiver vazio, aceita sem erro
    if (!phoneValue.trim()) {
      setPhoneError('');
      return true;
    }
  
    // Se digitou algo, precisa ter entre 10 e 11 dígitos
    if (numbers.length < 10) {
      setPhoneError('Telefone deve ter pelo menos 10 dígitos');
      return false;
    } else if (numbers.length > 11) {
      setPhoneError('Telefone deve ter no máximo 11 dígitos');
      return false;
    } else {
      setPhoneError('');
      return true;
    }
  };