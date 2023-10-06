export const thousands_separators = (num) => {
    var num_parts = num.toString().split(".");
    num_parts[0] = num_parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    return num_parts.join(".");
}

// export const BASE_URL = "http://202.57.31.154:4000"
// prod
export const BASE_URL = "http://localhost:4000/"