/* tslint:disable */
/* eslint-disable */
//  This file was automatically generated and should not be edited.

export type CreateUserInput = {
  id?: string | null;
  email: string;
  name?: string | null;
};

export type ModelUserConditionInput = {
  email?: ModelStringInput | null;
  name?: ModelStringInput | null;
  and?: Array<ModelUserConditionInput | null> | null;
  or?: Array<ModelUserConditionInput | null> | null;
  not?: ModelUserConditionInput | null;
};

export type ModelStringInput = {
  ne?: string | null;
  eq?: string | null;
  le?: string | null;
  lt?: string | null;
  ge?: string | null;
  gt?: string | null;
  contains?: string | null;
  notContains?: string | null;
  between?: Array<string | null> | null;
  beginsWith?: string | null;
  attributeExists?: boolean | null;
  attributeType?: ModelAttributeTypes | null;
  size?: ModelSizeInput | null;
};

export enum ModelAttributeTypes {
  binary = "binary",
  binarySet = "binarySet",
  bool = "bool",
  list = "list",
  map = "map",
  number = "number",
  numberSet = "numberSet",
  string = "string",
  stringSet = "stringSet",
  _null = "_null",
}

export type ModelSizeInput = {
  ne?: number | null;
  eq?: number | null;
  le?: number | null;
  lt?: number | null;
  ge?: number | null;
  gt?: number | null;
  between?: Array<number | null> | null;
};

export type UpdateUserInput = {
  id: string;
  email?: string | null;
  name?: string | null;
};

export type DeleteUserInput = {
  id?: string | null;
};

export type CreatePropertyInput = {
  name: string;
  ownerId: string;
  tables: Array<string | null>;
};

export type ModelPropertyConditionInput = {
  ownerId?: ModelIDInput | null;
  tables?: ModelStringInput | null;
  and?: Array<ModelPropertyConditionInput | null> | null;
  or?: Array<ModelPropertyConditionInput | null> | null;
  not?: ModelPropertyConditionInput | null;
};

export type ModelIDInput = {
  ne?: string | null;
  eq?: string | null;
  le?: string | null;
  lt?: string | null;
  ge?: string | null;
  gt?: string | null;
  contains?: string | null;
  notContains?: string | null;
  between?: Array<string | null> | null;
  beginsWith?: string | null;
  attributeExists?: boolean | null;
  attributeType?: ModelAttributeTypes | null;
  size?: ModelSizeInput | null;
};

export enum MenuItemStatus {
  AVAILABLE = "AVAILABLE",
  OUT_OF_STOCK = "OUT_OF_STOCK",
}

export type UpdatePropertyInput = {
  name: string;
  ownerId?: string | null;
  tables?: Array<string | null> | null;
};

export type DeletePropertyInput = {
  name: string;
};

export type CreateMenuItemInput = {
  id?: string | null;
  propertyName: string;
  i18n: Array<I18nMenuItemInput>;
  price: number;
  status: MenuItemStatus;
  allergyInfo?: string | null;
  callories?: string | null;
  image?: string | null;
};

export type I18nMenuItemInput = {
  language: Language;
  name: string;
  category?: string | null;
  description?: string | null;
};

export enum Language {
  ar = "ar",
  az = "az",
  be = "be",
  bg = "bg",
  bn = "bn",
  bs = "bs",
  ca = "ca",
  cs = "cs",
  da = "da",
  de = "de",
  en = "en",
  es = "es",
  et = "et",
  fa = "fa",
  fi = "fi",
  fr = "fr",
  gl = "gl",
  el = "el",
  he = "he",
  hi = "hi",
  hr = "hr",
  hu = "hu",
  hy = "hy",
  it = "it",
  id = "id",
  ja = "ja",
  ka = "ka",
  kk = "kk",
  ko = "ko",
  ky = "ky",
  lt = "lt",
  lv = "lv",
  mk = "mk",
  mn = "mn",
  ms = "ms",
  nb = "nb",
  nl = "nl",
  nn = "nn",
  pl = "pl",
  pt = "pt",
  ro = "ro",
  ru = "ru",
  sk = "sk",
  sl = "sl",
  sr = "sr",
  sv = "sv",
  th = "th",
  tr = "tr",
  uk = "uk",
  ur = "ur",
  uz = "uz",
  zh = "zh",
  vi = "vi",
}

export type ModelMenuItemConditionInput = {
  propertyName?: ModelStringInput | null;
  price?: ModelFloatInput | null;
  status?: ModelMenuItemStatusInput | null;
  allergyInfo?: ModelStringInput | null;
  callories?: ModelStringInput | null;
  image?: ModelStringInput | null;
  and?: Array<ModelMenuItemConditionInput | null> | null;
  or?: Array<ModelMenuItemConditionInput | null> | null;
  not?: ModelMenuItemConditionInput | null;
};

export type ModelFloatInput = {
  ne?: number | null;
  eq?: number | null;
  le?: number | null;
  lt?: number | null;
  ge?: number | null;
  gt?: number | null;
  between?: Array<number | null> | null;
  attributeExists?: boolean | null;
  attributeType?: ModelAttributeTypes | null;
};

export type ModelMenuItemStatusInput = {
  eq?: MenuItemStatus | null;
  ne?: MenuItemStatus | null;
};

export type UpdateMenuItemInput = {
  id: string;
  propertyName?: string | null;
  i18n?: Array<I18nMenuItemInput> | null;
  price?: number | null;
  status?: MenuItemStatus | null;
  allergyInfo?: string | null;
  callories?: string | null;
  image?: string | null;
};

export type DeleteMenuItemInput = {
  id?: string | null;
};

export type UpdateOrderInput = {
  id: string;
  propertyName?: string | null;
  orderItem?: Array<OrderItemInput> | null;
  createdAt?: string | null;
  status?: string | null;
  tableName?: string | null;
};

export type OrderItemInput = {
  name: string;
  price: number;
  quantity: number;
  allergyInfo?: string | null;
  customerComment?: string | null;
};

export type ModelOrderConditionInput = {
  propertyName?: ModelStringInput | null;
  createdAt?: ModelStringInput | null;
  status?: ModelStringInput | null;
  tableName?: ModelStringInput | null;
  and?: Array<ModelOrderConditionInput | null> | null;
  or?: Array<ModelOrderConditionInput | null> | null;
  not?: ModelOrderConditionInput | null;
};

export type DeleteOrderInput = {
  id?: string | null;
};

export type CreateOrderInput = {
  id?: string | null;
  propertyName: string;
  orderItem: Array<OrderItemInput>;
  createdAt?: string | null;
  status: string;
  tableName?: string | null;
};

export type ModelUserFilterInput = {
  id?: ModelIDInput | null;
  email?: ModelStringInput | null;
  name?: ModelStringInput | null;
  and?: Array<ModelUserFilterInput | null> | null;
  or?: Array<ModelUserFilterInput | null> | null;
  not?: ModelUserFilterInput | null;
};

export type ModelPropertyFilterInput = {
  name?: ModelStringInput | null;
  ownerId?: ModelIDInput | null;
  tables?: ModelStringInput | null;
  and?: Array<ModelPropertyFilterInput | null> | null;
  or?: Array<ModelPropertyFilterInput | null> | null;
  not?: ModelPropertyFilterInput | null;
};

export enum ModelSortDirection {
  ASC = "ASC",
  DESC = "DESC",
}

export type ModelMenuItemFilterInput = {
  id?: ModelIDInput | null;
  propertyName?: ModelStringInput | null;
  price?: ModelFloatInput | null;
  status?: ModelMenuItemStatusInput | null;
  allergyInfo?: ModelStringInput | null;
  callories?: ModelStringInput | null;
  image?: ModelStringInput | null;
  and?: Array<ModelMenuItemFilterInput | null> | null;
  or?: Array<ModelMenuItemFilterInput | null> | null;
  not?: ModelMenuItemFilterInput | null;
};

export type ModelOrderFilterInput = {
  id?: ModelIDInput | null;
  propertyName?: ModelStringInput | null;
  createdAt?: ModelStringInput | null;
  status?: ModelStringInput | null;
  tableName?: ModelStringInput | null;
  and?: Array<ModelOrderFilterInput | null> | null;
  or?: Array<ModelOrderFilterInput | null> | null;
  not?: ModelOrderFilterInput | null;
};

export type ModelStringKeyConditionInput = {
  eq?: string | null;
  le?: string | null;
  lt?: string | null;
  ge?: string | null;
  gt?: string | null;
  between?: Array<string | null> | null;
  beginsWith?: string | null;
};

export type CreateUserMutationVariables = {
  input: CreateUserInput;
  condition?: ModelUserConditionInput | null;
};

export type CreateUserMutation = {
  createUser: {
    __typename: "User";
    id: string;
    email: string;
    name: string | null;
    createdAt: string;
    updatedAt: string;
    owner: string | null;
    properties: {
      __typename: "ModelPropertyConnection";
      items: Array<{
        __typename: "Property";
        name: string;
        ownerId: string;
        tables: Array<string | null>;
        createdAt: string;
        updatedAt: string;
        owner: string | null;
      } | null> | null;
      nextToken: string | null;
    } | null;
  } | null;
};

export type UpdateUserMutationVariables = {
  input: UpdateUserInput;
  condition?: ModelUserConditionInput | null;
};

export type UpdateUserMutation = {
  updateUser: {
    __typename: "User";
    id: string;
    email: string;
    name: string | null;
    createdAt: string;
    updatedAt: string;
    owner: string | null;
    properties: {
      __typename: "ModelPropertyConnection";
      items: Array<{
        __typename: "Property";
        name: string;
        ownerId: string;
        tables: Array<string | null>;
        createdAt: string;
        updatedAt: string;
        owner: string | null;
      } | null> | null;
      nextToken: string | null;
    } | null;
  } | null;
};

export type DeleteUserMutationVariables = {
  input: DeleteUserInput;
  condition?: ModelUserConditionInput | null;
};

export type DeleteUserMutation = {
  deleteUser: {
    __typename: "User";
    id: string;
    email: string;
    name: string | null;
    createdAt: string;
    updatedAt: string;
    owner: string | null;
    properties: {
      __typename: "ModelPropertyConnection";
      items: Array<{
        __typename: "Property";
        name: string;
        ownerId: string;
        tables: Array<string | null>;
        createdAt: string;
        updatedAt: string;
        owner: string | null;
      } | null> | null;
      nextToken: string | null;
    } | null;
  } | null;
};

export type CreatePropertyMutationVariables = {
  input: CreatePropertyInput;
  condition?: ModelPropertyConditionInput | null;
};

export type CreatePropertyMutation = {
  createProperty: {
    __typename: "Property";
    name: string;
    ownerId: string;
    tables: Array<string | null>;
    createdAt: string;
    updatedAt: string;
    owner: string | null;
    menu: {
      __typename: "ModelMenuItemConnection";
      items: Array<{
        __typename: "MenuItem";
        id: string;
        propertyName: string;
        price: number;
        status: MenuItemStatus;
        allergyInfo: string | null;
        callories: string | null;
        image: string | null;
        createdAt: string;
        updatedAt: string;
        owner: string | null;
      } | null> | null;
      nextToken: string | null;
    } | null;
    orders: {
      __typename: "ModelOrderConnection";
      items: Array<{
        __typename: "Order";
        id: string;
        propertyName: string;
        createdAt: string;
        status: string;
        tableName: string | null;
        updatedAt: string;
      } | null> | null;
      nextToken: string | null;
    } | null;
  } | null;
};

export type UpdatePropertyMutationVariables = {
  input: UpdatePropertyInput;
  condition?: ModelPropertyConditionInput | null;
};

export type UpdatePropertyMutation = {
  updateProperty: {
    __typename: "Property";
    name: string;
    ownerId: string;
    tables: Array<string | null>;
    createdAt: string;
    updatedAt: string;
    owner: string | null;
    menu: {
      __typename: "ModelMenuItemConnection";
      items: Array<{
        __typename: "MenuItem";
        id: string;
        propertyName: string;
        price: number;
        status: MenuItemStatus;
        allergyInfo: string | null;
        callories: string | null;
        image: string | null;
        createdAt: string;
        updatedAt: string;
        owner: string | null;
      } | null> | null;
      nextToken: string | null;
    } | null;
    orders: {
      __typename: "ModelOrderConnection";
      items: Array<{
        __typename: "Order";
        id: string;
        propertyName: string;
        createdAt: string;
        status: string;
        tableName: string | null;
        updatedAt: string;
      } | null> | null;
      nextToken: string | null;
    } | null;
  } | null;
};

export type DeletePropertyMutationVariables = {
  input: DeletePropertyInput;
  condition?: ModelPropertyConditionInput | null;
};

export type DeletePropertyMutation = {
  deleteProperty: {
    __typename: "Property";
    name: string;
    ownerId: string;
    tables: Array<string | null>;
    createdAt: string;
    updatedAt: string;
    owner: string | null;
    menu: {
      __typename: "ModelMenuItemConnection";
      items: Array<{
        __typename: "MenuItem";
        id: string;
        propertyName: string;
        price: number;
        status: MenuItemStatus;
        allergyInfo: string | null;
        callories: string | null;
        image: string | null;
        createdAt: string;
        updatedAt: string;
        owner: string | null;
      } | null> | null;
      nextToken: string | null;
    } | null;
    orders: {
      __typename: "ModelOrderConnection";
      items: Array<{
        __typename: "Order";
        id: string;
        propertyName: string;
        createdAt: string;
        status: string;
        tableName: string | null;
        updatedAt: string;
      } | null> | null;
      nextToken: string | null;
    } | null;
  } | null;
};

export type CreateMenuItemMutationVariables = {
  input: CreateMenuItemInput;
  condition?: ModelMenuItemConditionInput | null;
};

export type CreateMenuItemMutation = {
  createMenuItem: {
    __typename: "MenuItem";
    id: string;
    propertyName: string;
    i18n: Array<{
      __typename: "I18nMenuItem";
      language: Language;
      name: string;
      category: string | null;
      description: string | null;
    }>;
    price: number;
    status: MenuItemStatus;
    allergyInfo: string | null;
    callories: string | null;
    image: string | null;
    createdAt: string;
    updatedAt: string;
    owner: string | null;
  } | null;
};

export type UpdateMenuItemMutationVariables = {
  input: UpdateMenuItemInput;
  condition?: ModelMenuItemConditionInput | null;
};

export type UpdateMenuItemMutation = {
  updateMenuItem: {
    __typename: "MenuItem";
    id: string;
    propertyName: string;
    i18n: Array<{
      __typename: "I18nMenuItem";
      language: Language;
      name: string;
      category: string | null;
      description: string | null;
    }>;
    price: number;
    status: MenuItemStatus;
    allergyInfo: string | null;
    callories: string | null;
    image: string | null;
    createdAt: string;
    updatedAt: string;
    owner: string | null;
  } | null;
};

export type DeleteMenuItemMutationVariables = {
  input: DeleteMenuItemInput;
  condition?: ModelMenuItemConditionInput | null;
};

export type DeleteMenuItemMutation = {
  deleteMenuItem: {
    __typename: "MenuItem";
    id: string;
    propertyName: string;
    i18n: Array<{
      __typename: "I18nMenuItem";
      language: Language;
      name: string;
      category: string | null;
      description: string | null;
    }>;
    price: number;
    status: MenuItemStatus;
    allergyInfo: string | null;
    callories: string | null;
    image: string | null;
    createdAt: string;
    updatedAt: string;
    owner: string | null;
  } | null;
};

export type UpdateOrderMutationVariables = {
  input: UpdateOrderInput;
  condition?: ModelOrderConditionInput | null;
};

export type UpdateOrderMutation = {
  updateOrder: {
    __typename: "Order";
    id: string;
    propertyName: string;
    orderItem: Array<{
      __typename: "OrderItem";
      name: string;
      price: number;
      quantity: number;
      allergyInfo: string | null;
      customerComment: string | null;
    }>;
    createdAt: string;
    status: string;
    tableName: string | null;
    updatedAt: string;
  } | null;
};

export type DeleteOrderMutationVariables = {
  input: DeleteOrderInput;
  condition?: ModelOrderConditionInput | null;
};

export type DeleteOrderMutation = {
  deleteOrder: {
    __typename: "Order";
    id: string;
    propertyName: string;
    orderItem: Array<{
      __typename: "OrderItem";
      name: string;
      price: number;
      quantity: number;
      allergyInfo: string | null;
      customerComment: string | null;
    }>;
    createdAt: string;
    status: string;
    tableName: string | null;
    updatedAt: string;
  } | null;
};

export type CreateOrderMutationVariables = {
  input: CreateOrderInput;
  condition?: ModelOrderConditionInput | null;
};

export type CreateOrderMutation = {
  createOrder: {
    __typename: "Order";
    id: string;
    propertyName: string;
    orderItem: Array<{
      __typename: "OrderItem";
      name: string;
      price: number;
      quantity: number;
      allergyInfo: string | null;
      customerComment: string | null;
    }>;
    createdAt: string;
    status: string;
    tableName: string | null;
    updatedAt: string;
  } | null;
};

export type GetUserQueryVariables = {
  id: string;
};

export type GetUserQuery = {
  getUser: {
    __typename: "User";
    id: string;
    email: string;
    name: string | null;
    createdAt: string;
    updatedAt: string;
    owner: string | null;
    properties: {
      __typename: "ModelPropertyConnection";
      items: Array<{
        __typename: "Property";
        name: string;
        ownerId: string;
        tables: Array<string | null>;
        createdAt: string;
        updatedAt: string;
        owner: string | null;
      } | null> | null;
      nextToken: string | null;
    } | null;
  } | null;
};

export type ListUsersQueryVariables = {
  filter?: ModelUserFilterInput | null;
  limit?: number | null;
  nextToken?: string | null;
};

export type ListUsersQuery = {
  listUsers: {
    __typename: "ModelUserConnection";
    items: Array<{
      __typename: "User";
      id: string;
      email: string;
      name: string | null;
      createdAt: string;
      updatedAt: string;
      owner: string | null;
      properties: {
        __typename: "ModelPropertyConnection";
        nextToken: string | null;
      } | null;
    } | null> | null;
    nextToken: string | null;
  } | null;
};

export type GetPropertyQueryVariables = {
  name: string;
};

export type GetPropertyQuery = {
  getProperty: {
    __typename: "Property";
    name: string;
    ownerId: string;
    tables: Array<string | null>;
    createdAt: string;
    updatedAt: string;
    owner: string | null;
    menu: {
      __typename: "ModelMenuItemConnection";
      items: Array<{
        __typename: "MenuItem";
        i18n: {
          __typename: "I18nMenuItem";

          description: string;
          name: string;
          language: Language;
          category: string;
        }[];
        id: string;
        propertyName: string;
        price: number;
        status: MenuItemStatus;
        allergyInfo: string | null;
        callories: string | null;
        image: string | null;
        createdAt: string;
        updatedAt: string;
        owner: string | null;
      } | null> | null;
      nextToken: string | null;
    } | null;
    orders: {
      __typename: "ModelOrderConnection";
      items: Array<{
        __typename: "Order";
        id: string;
        propertyName: string;
        createdAt: string;
        status: string;
        tableName: string | null;
        updatedAt: string;
      } | null> | null;
      nextToken: string | null;
    } | null;
  } | null;
};

export type ListPropertysQueryVariables = {
  name?: string | null;
  filter?: ModelPropertyFilterInput | null;
  limit?: number | null;
  nextToken?: string | null;
  sortDirection?: ModelSortDirection | null;
};

export type ListPropertysQuery = {
  listPropertys: {
    __typename: "ModelPropertyConnection";
    items: Array<{
      __typename: "Property";
      name: string;
      ownerId: string;
      tables: Array<string | null>;
      createdAt: string;
      updatedAt: string;
      owner: string | null;
      menu: {
        __typename: "ModelMenuItemConnection";
        nextToken: string | null;
      } | null;
      orders: {
        __typename: "ModelOrderConnection";
        nextToken: string | null;
      } | null;
    } | null> | null;
    nextToken: string | null;
  } | null;
};

export type GetMenuItemQueryVariables = {
  id: string;
};

export type GetMenuItemQuery = {
  getMenuItem: {
    __typename: "MenuItem";
    id: string;
    propertyName: string;
    i18n: Array<{
      __typename: "I18nMenuItem";
      language: Language;
      name: string;
      category: string | null;
      description: string | null;
    }>;
    price: number;
    status: MenuItemStatus;
    allergyInfo: string | null;
    callories: string | null;
    image: string | null;
    createdAt: string;
    updatedAt: string;
    owner: string | null;
  } | null;
};

export type ListMenuItemsQueryVariables = {
  filter?: ModelMenuItemFilterInput | null;
  limit?: number | null;
  nextToken?: string | null;
};

export type ListMenuItemsQuery = {
  listMenuItems: {
    __typename: "ModelMenuItemConnection";
    items: Array<{
      __typename: "MenuItem";
      id: string;
      propertyName: string;
      i18n: Array<{
        __typename: "I18nMenuItem";
        language: Language;
        name: string;
        category: string | null;
        description: string | null;
      }>;
      price: number;
      status: MenuItemStatus;
      allergyInfo: string | null;
      callories: string | null;
      image: string | null;
      createdAt: string;
      updatedAt: string;
      owner: string | null;
    } | null> | null;
    nextToken: string | null;
  } | null;
};

export type MenuItemsByPropertyQueryVariables = {
  propertyName?: string | null;
  sortDirection?: ModelSortDirection | null;
  filter?: ModelMenuItemFilterInput | null;
  limit?: number | null;
  nextToken?: string | null;
};

export type MenuItemsByPropertyQuery = {
  menuItemsByProperty: {
    __typename: "ModelMenuItemConnection";
    items: Array<{
      __typename: "MenuItem";
      id: string;
      propertyName: string;
      i18n: Array<{
        __typename: "I18nMenuItem";
        language: Language;
        name: string;
        category: string | null;
        description: string | null;
      }>;
      price: number;
      status: MenuItemStatus;
      allergyInfo: string | null;
      callories: string | null;
      image: string | null;
      createdAt: string;
      updatedAt: string;
      owner: string | null;
    } | null> | null;
    nextToken: string | null;
  } | null;
};

export type GetOrderQueryVariables = {
  id: string;
};

export type GetOrderQuery = {
  getOrder: {
    __typename: "Order";
    id: string;
    propertyName: string;
    orderItem: Array<{
      __typename: "OrderItem";
      name: string;
      price: number;
      quantity: number;
      allergyInfo: string | null;
      customerComment: string | null;
    }>;
    createdAt: string;
    status: string;
    tableName: string | null;
    updatedAt: string;
  } | null;
};

export type ListOrdersQueryVariables = {
  filter?: ModelOrderFilterInput | null;
  limit?: number | null;
  nextToken?: string | null;
};

export type ListOrdersQuery = {
  listOrders: {
    __typename: "ModelOrderConnection";
    items: Array<{
      __typename: "Order";
      id: string;
      propertyName: string;
      orderItem: Array<{
        __typename: "OrderItem";
        name: string;
        price: number;
        quantity: number;
        allergyInfo: string | null;
        customerComment: string | null;
      }>;
      createdAt: string;
      status: string;
      tableName: string | null;
      updatedAt: string;
    } | null> | null;
    nextToken: string | null;
  } | null;
};

export type OrderByPropertyByCreatedAtQueryVariables = {
  propertyName?: string | null;
  createdAt?: ModelStringKeyConditionInput | null;
  sortDirection?: ModelSortDirection | null;
  filter?: ModelOrderFilterInput | null;
  limit?: number | null;
  nextToken?: string | null;
};

export type OrderByPropertyByCreatedAtQuery = {
  orderByPropertyByCreatedAt: {
    __typename: "ModelOrderConnection";
    items: Array<{
      __typename: "Order";
      id: string;
      propertyName: string;
      orderItem: Array<{
        __typename: "OrderItem";
        name: string;
        price: number;
        quantity: number;
        allergyInfo: string | null;
        customerComment: string | null;
      }>;
      createdAt: string;
      status: string;
      tableName: string | null;
      updatedAt: string;
    } | null> | null;
    nextToken: string | null;
  } | null;
};

export type OrderByPropertyByStatusQueryVariables = {
  propertyName?: string | null;
  status?: ModelStringKeyConditionInput | null;
  sortDirection?: ModelSortDirection | null;
  filter?: ModelOrderFilterInput | null;
  limit?: number | null;
  nextToken?: string | null;
};

export type OrderByPropertyByStatusQuery = {
  orderByPropertyByStatus: {
    __typename: "ModelOrderConnection";
    items: Array<{
      __typename: "Order";
      id: string;
      propertyName: string;
      orderItem: Array<{
        __typename: "OrderItem";
        name: string;
        price: number;
        quantity: number;
        allergyInfo: string | null;
        customerComment: string | null;
      }>;
      createdAt: string;
      status: string;
      tableName: string | null;
      updatedAt: string;
    } | null> | null;
    nextToken: string | null;
  } | null;
};

export type OnCreateOrderSubscriptionVariables = {
  propertyName?: string | null;
};

export type OnCreateOrderSubscription = {
  onCreateOrder: {
    __typename: "Order";
    id: string;
    propertyName: string;
    orderItem: Array<{
      __typename: "OrderItem";
      name: string;
      price: number;
      quantity: number;
      allergyInfo: string | null;
      customerComment: string | null;
    }>;
    createdAt: string;
    status: string;
    tableName: string | null;
    updatedAt: string;
  } | null;
};

export type OnUpdateOrderSubscriptionVariables = {
  id?: string | null;
  propertyName?: string | null;
};

export type OnUpdateOrderSubscription = {
  onUpdateOrder: {
    __typename: "Order";
    id: string;
    propertyName: string;
    orderItem: Array<{
      __typename: "OrderItem";
      name: string;
      price: number;
      quantity: number;
      allergyInfo: string | null;
      customerComment: string | null;
    }>;
    createdAt: string;
    status: string;
    tableName: string | null;
    updatedAt: string;
  } | null;
};

export type OnCreateUserSubscriptionVariables = {
  owner?: string | null;
};

export type OnCreateUserSubscription = {
  onCreateUser: {
    __typename: "User";
    id: string;
    email: string;
    name: string | null;
    createdAt: string;
    updatedAt: string;
    owner: string | null;
    properties: {
      __typename: "ModelPropertyConnection";
      items: Array<{
        __typename: "Property";
        name: string;
        ownerId: string;
        tables: Array<string | null>;
        createdAt: string;
        updatedAt: string;
        owner: string | null;
      } | null> | null;
      nextToken: string | null;
    } | null;
  } | null;
};

export type OnUpdateUserSubscriptionVariables = {
  owner?: string | null;
};

export type OnUpdateUserSubscription = {
  onUpdateUser: {
    __typename: "User";
    id: string;
    email: string;
    name: string | null;
    createdAt: string;
    updatedAt: string;
    owner: string | null;
    properties: {
      __typename: "ModelPropertyConnection";
      items: Array<{
        __typename: "Property";
        name: string;
        ownerId: string;
        tables: Array<string | null>;
        createdAt: string;
        updatedAt: string;
        owner: string | null;
      } | null> | null;
      nextToken: string | null;
    } | null;
  } | null;
};

export type OnDeleteUserSubscriptionVariables = {
  owner?: string | null;
};

export type OnDeleteUserSubscription = {
  onDeleteUser: {
    __typename: "User";
    id: string;
    email: string;
    name: string | null;
    createdAt: string;
    updatedAt: string;
    owner: string | null;
    properties: {
      __typename: "ModelPropertyConnection";
      items: Array<{
        __typename: "Property";
        name: string;
        ownerId: string;
        tables: Array<string | null>;
        createdAt: string;
        updatedAt: string;
        owner: string | null;
      } | null> | null;
      nextToken: string | null;
    } | null;
  } | null;
};

export type OnCreatePropertySubscriptionVariables = {
  owner?: string | null;
};

export type OnCreatePropertySubscription = {
  onCreateProperty: {
    __typename: "Property";
    name: string;
    ownerId: string;
    tables: Array<string | null>;
    createdAt: string;
    updatedAt: string;
    owner: string | null;
    menu: {
      __typename: "ModelMenuItemConnection";
      items: Array<{
        __typename: "MenuItem";
        id: string;
        propertyName: string;
        price: number;
        status: MenuItemStatus;
        allergyInfo: string | null;
        callories: string | null;
        image: string | null;
        createdAt: string;
        updatedAt: string;
        owner: string | null;
      } | null> | null;
      nextToken: string | null;
    } | null;
    orders: {
      __typename: "ModelOrderConnection";
      items: Array<{
        __typename: "Order";
        id: string;
        propertyName: string;
        createdAt: string;
        status: string;
        tableName: string | null;
        updatedAt: string;
      } | null> | null;
      nextToken: string | null;
    } | null;
  } | null;
};

export type OnUpdatePropertySubscriptionVariables = {
  owner?: string | null;
};

export type OnUpdatePropertySubscription = {
  onUpdateProperty: {
    __typename: "Property";
    name: string;
    ownerId: string;
    tables: Array<string | null>;
    createdAt: string;
    updatedAt: string;
    owner: string | null;
    menu: {
      __typename: "ModelMenuItemConnection";
      items: Array<{
        __typename: "MenuItem";
        id: string;
        propertyName: string;
        price: number;
        status: MenuItemStatus;
        allergyInfo: string | null;
        callories: string | null;
        image: string | null;
        createdAt: string;
        updatedAt: string;
        owner: string | null;
      } | null> | null;
      nextToken: string | null;
    } | null;
    orders: {
      __typename: "ModelOrderConnection";
      items: Array<{
        __typename: "Order";
        id: string;
        propertyName: string;
        createdAt: string;
        status: string;
        tableName: string | null;
        updatedAt: string;
      } | null> | null;
      nextToken: string | null;
    } | null;
  } | null;
};

export type OnDeletePropertySubscriptionVariables = {
  owner?: string | null;
};

export type OnDeletePropertySubscription = {
  onDeleteProperty: {
    __typename: "Property";
    name: string;
    ownerId: string;
    tables: Array<string | null>;
    createdAt: string;
    updatedAt: string;
    owner: string | null;
    menu: {
      __typename: "ModelMenuItemConnection";
      items: Array<{
        __typename: "MenuItem";
        id: string;
        propertyName: string;
        price: number;
        status: MenuItemStatus;
        allergyInfo: string | null;
        callories: string | null;
        image: string | null;
        createdAt: string;
        updatedAt: string;
        owner: string | null;
      } | null> | null;
      nextToken: string | null;
    } | null;
    orders: {
      __typename: "ModelOrderConnection";
      items: Array<{
        __typename: "Order";
        id: string;
        propertyName: string;
        createdAt: string;
        status: string;
        tableName: string | null;
        updatedAt: string;
      } | null> | null;
      nextToken: string | null;
    } | null;
  } | null;
};

export type OnCreateMenuItemSubscriptionVariables = {
  owner?: string | null;
};

export type OnCreateMenuItemSubscription = {
  onCreateMenuItem: {
    __typename: "MenuItem";
    id: string;
    propertyName: string;
    i18n: Array<{
      __typename: "I18nMenuItem";
      language: Language;
      name: string;
      category: string | null;
      description: string | null;
    }>;
    price: number;
    status: MenuItemStatus;
    allergyInfo: string | null;
    callories: string | null;
    image: string | null;
    createdAt: string;
    updatedAt: string;
    owner: string | null;
  } | null;
};

export type OnUpdateMenuItemSubscriptionVariables = {
  owner?: string | null;
};

export type OnUpdateMenuItemSubscription = {
  onUpdateMenuItem: {
    __typename: "MenuItem";
    id: string;
    propertyName: string;
    i18n: Array<{
      __typename: "I18nMenuItem";
      language: Language;
      name: string;
      category: string | null;
      description: string | null;
    }>;
    price: number;
    status: MenuItemStatus;
    allergyInfo: string | null;
    callories: string | null;
    image: string | null;
    createdAt: string;
    updatedAt: string;
    owner: string | null;
  } | null;
};

export type OnDeleteMenuItemSubscriptionVariables = {
  owner?: string | null;
};

export type OnDeleteMenuItemSubscription = {
  onDeleteMenuItem: {
    __typename: "MenuItem";
    id: string;
    propertyName: string;
    i18n: Array<{
      __typename: "I18nMenuItem";
      language: Language;
      name: string;
      category: string | null;
      description: string | null;
    }>;
    price: number;
    status: MenuItemStatus;
    allergyInfo: string | null;
    callories: string | null;
    image: string | null;
    createdAt: string;
    updatedAt: string;
    owner: string | null;
  } | null;
};
