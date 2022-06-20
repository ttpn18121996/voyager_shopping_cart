export const _customThemeSelect2 = (theme) => ({
    ...theme,
    borderColor: "primary",
    colors: {
        ...theme.colors,
        primary: "#a5b4fc",
    },
    cursor: "text",
});

export const nonUnicode = (value) =>
    value
        ? value
              .replace(/á|à|ả|ạ|ã|ă|ắ|ằ|ẳ|ẵ|ặ|â|ấ|ầ|ẩ|ẫ|ậ/g, "a")
              .replace(/Á|À|Ả|Ạ|Ã|Ă|Ắ|Ằ|Ẳ|Ẵ|Ặ|Â|Ấ|Ầ|Ẩ|Ẫ|Ậ/g, "A")
              .replace(/đ/g, "d")
              .replace(/Đ/g, "D")
              .replace(/é|è|ẻ|ẽ|ẹ|ê|ế|ề|ể|ễ|ệ/g, "e")
              .replace(/E|É|È|Ẻ|Ẽ|Ê|Ế|Ề|Ể|Ễ|Ệ/g, "E")
              .replace(/i|í|ì|ỉ|ĩ|ị/g, "i")
              .replace(/I|Í|Ì|Ỉ|Ĩ|Ị/g, "I")
              .replace(/ó|ò|ỏ|õ|ọ|ô|ố|ồ|ổ|ỗ|ộ|ơ|ớ|ờ|ở|ỡ|ợ/g, "o")
              .replace(/Ó|Ò|Ỏ|Õ|Ọ|Ô|Ố|Ồ|Ổ|Ỗ|Ộ|Ơ|Ớ|Ờ|Ở|Ỡ|Ợ/g, "O")
              .replace(/ú|ù|ủ|ũ|ụ|ư|ứ|ừ|ử|ữ|ự/g, "u")
              .replace(/Ú|Ù|Ủ|Ũ|Ụ|Ư|Ứ|Ừ|Ử|Ữ|Ự/g, "U")
              .replace(/ý|ỳ|ỷ|ỹ|ỵ/g, "y")
              .replace(/Ý|Ỳ|Ỷ|Ỹ|Ỵ/g, "Y")
        : "";
