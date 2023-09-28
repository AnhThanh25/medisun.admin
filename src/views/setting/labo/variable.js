import { getUserName, getToken, getClinicID } from "@/utils/auth";

export function urlUploadImageMaterial(materialID) {
  return `http://202.191.56.172/PKPosAPI/File/UploadImageMaterial?UserName=${getUserName()}&Token=${getToken()}&ClinicID=${getClinicID()}&MaterialID=${materialID}`;
}
