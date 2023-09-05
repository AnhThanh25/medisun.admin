import Cookies from "js-cookie";
// import { getDateCurrent, getTimeYesterday } from '@/helpers/getTime'

const TokenKey = "TokenPK";
const UserID = "uPharmaID";
const UserType = "UTypeTxt";
const UserName = "FullName";
const PhoneNumber = "PhoneNumber";
const GroupMail = "GroupMail";
const Hotline = "Hotline";
const Type = "UType";
const Email = "Email";
const ShopLst = "LstShop";
const ShopName = "ShopName";
const ShopCode = "ShopCode";
const RuleUser = "user";
const long = "Long";
const lat = "Lat";
const schelvesInfo = "schelvesInfo";
const accessToken = "accessToken";
const pharmaCode = "pharmaCode";
const pharmaAdress = "pharmaAddress";
const timeStart = "timeStart";
const timeEnd = "timeEnd";
const CheckStorage = "CheckStorage";
export function setShops(vals) {
  return localStorage.setItem(JSON.stringify(ShopLst), vals);
}
export function getShops() {
  return localStorage.getItem(ShopLst);
}
export function removeShops() {
  return localStorage.removeItem(ShopLst);
}

export function setCheckStorage(time) {
  return Cookies.set(CheckStorage, time);
}
export function getCheckStorage() {
  return Cookies.get(CheckStorage);
}
export function removeCheckStorage() {
  return Cookies.remove(CheckStorage);
}

export function setTimeStart(time) {
  return Cookies.set(timeStart, time);
}
export function getTimeStart() {
  return Cookies.get(timeStart);
}
export function removeTimeStart() {
  return Cookies.remove(timeStart);
}

export function setTimeEnd(time) {
  return Cookies.set(timeEnd, time);
}
export function getTimeEnd() {
  return Cookies.get(timeEnd);
}
export function removeTimeEnd() {
  return Cookies.remove(timeEnd);
}

export function setShopLst(shopLst) {
  return Cookies.set(ShopLst, shopLst);
}
export function getShopLst() {
  return Cookies.get(ShopLst);
}
export function removeShopLst() {
  return Cookies.remove(ShopLst);
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
export function setPhoneNumber(phoneNumber) {
  return Cookies.set(PhoneNumber, phoneNumber);
}
export function getPhoneNumber() {
  return Cookies.get(PhoneNumber);
}
export function removePhoneNumber() {
  return Cookies.remove(PhoneNumber);
}
export function setToken(token) {
  return Cookies.set(TokenKey, token, { expires: 356 });
}
export function getToken() {
  return Cookies.get(TokenKey);
}
export function removeToken() {
  return Cookies.remove(TokenKey);
}
export function getUserID() {
  return Cookies.get(UserID);
}
export function setUserID(token) {
  return Cookies.set(UserID, token);
}
export function removeUserID() {
  return Cookies.remove(UserID);
}
export function getUserType() {
  return Cookies.get(UserType);
}
export function setUserType(type) {
  return Cookies.set(UserType, type);
}
export function removeUserType() {
  return Cookies.remove(UserType);
}
export function getType() {
  return Cookies.get(Type);
}
export function setType(type) {
  return Cookies.set(Type, type);
}
export function removeType() {
  return Cookies.remove(Type);
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
export function setShopName(name) {
  return Cookies.set(ShopName, name);
}

export function removeGroupMail() {
  return Cookies.remove(GroupMail);
}
export function getGroupMail() {
  return Cookies.get(GroupMail);
}
export function setGroupMail(name) {
  return Cookies.set(GroupMail, name);
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

export function getShopName() {
  return Cookies.get(ShopName);
}
export function removeShopName() {
  return Cookies.remove(ShopName);
}
export function setShopCode(name) {
  return Cookies.set(ShopCode, name);
}
export function getShopCode() {
  return Cookies.get(ShopCode);
}
export function removeShopCode() {
  return Cookies.remove(ShopCode);
}
export function setInventoryCode(code) {
  return Cookies.set("inventoryCode", code);
}
export function getInventoryCode() {
  return Cookies.get("inventoryCode");
}
export function removeInventoryCode() {
  return Cookies.remove("inventoryCode");
}
export function setProductID(product) {
  return Cookies.set("productId", product);
}
export function getProductID() {
  return Cookies.get("productId");
}
export function removeProductID() {
  return Cookies.remove("productId");
}

export function setRoom(room) {
  return Cookies.set("roomId", room);
}
export function getRoom() {
  return Cookies.get("roomId");
}
export function removeRoom() {
  return Cookies.remove("roomId");
}

export function setRuleUser(rule) {
  return Cookies.set(RuleUser, rule);
}
export function getRuleUser() {
  return Cookies.get(RuleUser);
}
export function removeRuleUser() {
  return Cookies.remove(RuleUser);
}

export function setLong(val) {
  return Cookies.set(long, val);
}
export function getLong() {
  return Cookies.get(long);
}
export function removeLong() {
  return Cookies.remove(long);
}

export function setLat(value) {
  return Cookies.set(lat, value);
}
export function getLat() {
  return Cookies.get(lat);
}
export function removeLat() {
  return Cookies.remove(lat);
}
export function setSchelvesInfo(val) {
  return Cookies.set(schelvesInfo, val);
}
export function getSchelvesInfo() {
  return Cookies.get(schelvesInfo);
}
export function removeSchelvesInfo() {
  return Cookies.remove(schelvesInfo);
}
export function setAccessToken(val) {
  return Cookies.set(accessToken, val);
}
export function getAccessToken() {
  return Cookies.get(accessToken);
}
export function removeAccessToken() {
  return Cookies.remove(accessToken);
}
export function setPharmaCode(val) {
  return Cookies.set(pharmaCode, val);
}
export function getPharmaCode() {
  return Cookies.get(pharmaCode);
}
export function removePharmaCode() {
  return Cookies.remove(pharmaCode);
}
export function setShopAddress(val) {
  return Cookies.set(pharmaAdress, val);
}
export function getShopAddress() {
  return Cookies.get(pharmaAdress);
}
export function removeShopAddress() {
  return Cookies.remove(pharmaAdress);
}
