export const getObjectById = (id,data) => {
    // Tìm phim có ID khớp với ID yêu cầu
    return data?.find((element) => element.id === id);
};