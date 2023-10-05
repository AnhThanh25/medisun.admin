import { getUserName, getToken } from "@/utils/auth";

export function urlUploadImageMaterial(materialID) {
  return `http://202.191.56.172/PKPosAPI/File/UploadImageMaterial?UserName=${getUserName()}&Token=${getToken()}&MaterialID=${materialID}`;
}
