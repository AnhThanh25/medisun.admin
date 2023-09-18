import Cookies from "js-cookie";

const TokenKey = "TokenPK";
const UserName = "UserNamePK";
const FullName = "FullNamePK";
const PhoneNumber = "PhoneNumberPK";
const Hotline = "HotlinePK";
const Email = "EmailPK";
const Role = "RolePK";
const ClinicID = "ClinicIDPK";
const ClinicName = "ClinicNamePK";
const Address = "AddressPK";
const City = "CityPK";
const District = "DistrictPK";
const Commune = "CommunePK";

export function setToken(token) {
  return Cookies.set(TokenKey, token, { expires: 356 });
}
export function getToken() {
  return Cookies.get(TokenKey);
}
export function removeToken() {
  return Cookies.remove(TokenKey);
}

export function setUserName(name) {
  return Cookies.set(UserName, name);
}
export function removeUserName() {
  return Cookies.remove(UserName);
}
export function getUserName() {
  return Cookies.get(UserName);
}

export function setFullName(time) {
  return Cookies.set(FullName, time);
}
export function getFullName() {
  return Cookies.get(FullName);
}
export function removeFullName() {
  return Cookies.remove(FullName);
}

export function setPhoneNumber(phoneNumber) {
  return Cookies.set(PhoneNumber, phoneNumber);
}
export function getPhoneNumber() {
  return Cookies.get(PhoneNumber);
}
export function removePhoneNumber() {
  return Cookies.remove(PhoneNumber);
}

export function removeHotline() {
  return Cookies.remove(Hotline);
}
export function getHotline() {
  return Cookies.get(Hotline);
}
export function setHotline(name) {
  return Cookies.set(Hotline, name);
}

export function setEmail(email) {
  return Cookies.set(Email, email);
}
export function getEmail() {
  return Cookies.get(Email);
}
export function removeEmail() {
  return Cookies.remove(Email);
}

export function setRole(time) {
  return Cookies.set(Role, time);
}
export function getRole() {
  return Cookies.get(Role);
}
export function removeRole() {
  return Cookies.remove(Role);
}

export function setClinicID(time) {
  return Cookies.set(ClinicID, time);
}
export function getClinicID() {
  return Cookies.get(ClinicID);
}
export function removeClinicID() {
  return Cookies.remove(ClinicID);
}

export function setClinicName(shopLst) {
  return Cookies.set(ClinicName, shopLst);
}
export function getClinicName() {
  return Cookies.get(ClinicName);
}
export function removeClinicName() {
  return Cookies.remove(ClinicName);
}

export function getAddress() {
  return Cookies.get(Address);
}
export function setAddress(token) {
  return Cookies.set(Address, token);
}
export function removeAddress() {
  return Cookies.remove(Address);
}

export function getCity() {
  return Cookies.get(City);
}
export function setCity(type) {
  return Cookies.set(City, type);
}
export function removeCity() {
  return Cookies.remove(City);
}

export function getDistrict() {
  return Cookies.get(District);
}
export function setDistrict(type) {
  return Cookies.set(District, type);
}
export function removeDistrict() {
  return Cookies.remove(District);
}

export function setCommune(name) {
  return Cookies.set(Commune, name);
}
export function getCommune() {
  return Cookies.get(Commune);
}
export function removeCommune() {
  return Cookies.remove(Commune);
}
