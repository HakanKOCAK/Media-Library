export const formatCheckToFromForm = (input) => /^((?:[01]\d|2[0-3])-[0-5]\d-[0-5]\d)\/((?:[01]\d|2[0-3])-[0-5]\d-[0-5]\d)$/.test(input);
export const formatCheckFromInput = (input) => /^((?:[01]\d|2[0-3]):[0-5]\d:[0-5]\d)$/.test(input);
export const nameSurnameCheck = (input) => /^[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšşğıžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ,.'-]+$/u.test(input);
