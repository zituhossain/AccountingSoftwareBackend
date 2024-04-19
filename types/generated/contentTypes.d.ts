import type { Schema, Attribute } from '@strapi/strapi';

export interface AdminPermission extends Schema.CollectionType {
  collectionName: 'admin_permissions';
  info: {
    name: 'Permission';
    description: '';
    singularName: 'permission';
    pluralName: 'permissions';
    displayName: 'Permission';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    action: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    actionParameters: Attribute.JSON & Attribute.DefaultTo<{}>;
    subject: Attribute.String &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    properties: Attribute.JSON & Attribute.DefaultTo<{}>;
    conditions: Attribute.JSON & Attribute.DefaultTo<[]>;
    role: Attribute.Relation<'admin::permission', 'manyToOne', 'admin::role'>;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'admin::permission',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'admin::permission',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface AdminUser extends Schema.CollectionType {
  collectionName: 'admin_users';
  info: {
    name: 'User';
    description: '';
    singularName: 'user';
    pluralName: 'users';
    displayName: 'User';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    firstname: Attribute.String &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    lastname: Attribute.String &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    username: Attribute.String;
    email: Attribute.Email &
      Attribute.Required &
      Attribute.Private &
      Attribute.Unique &
      Attribute.SetMinMaxLength<{
        minLength: 6;
      }>;
    password: Attribute.Password &
      Attribute.Private &
      Attribute.SetMinMaxLength<{
        minLength: 6;
      }>;
    resetPasswordToken: Attribute.String & Attribute.Private;
    registrationToken: Attribute.String & Attribute.Private;
    isActive: Attribute.Boolean &
      Attribute.Private &
      Attribute.DefaultTo<false>;
    roles: Attribute.Relation<'admin::user', 'manyToMany', 'admin::role'> &
      Attribute.Private;
    blocked: Attribute.Boolean & Attribute.Private & Attribute.DefaultTo<false>;
    preferedLanguage: Attribute.String;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<'admin::user', 'oneToOne', 'admin::user'> &
      Attribute.Private;
    updatedBy: Attribute.Relation<'admin::user', 'oneToOne', 'admin::user'> &
      Attribute.Private;
  };
}

export interface AdminRole extends Schema.CollectionType {
  collectionName: 'admin_roles';
  info: {
    name: 'Role';
    description: '';
    singularName: 'role';
    pluralName: 'roles';
    displayName: 'Role';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    name: Attribute.String &
      Attribute.Required &
      Attribute.Unique &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    code: Attribute.String &
      Attribute.Required &
      Attribute.Unique &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    description: Attribute.String;
    users: Attribute.Relation<'admin::role', 'manyToMany', 'admin::user'>;
    permissions: Attribute.Relation<
      'admin::role',
      'oneToMany',
      'admin::permission'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<'admin::role', 'oneToOne', 'admin::user'> &
      Attribute.Private;
    updatedBy: Attribute.Relation<'admin::role', 'oneToOne', 'admin::user'> &
      Attribute.Private;
  };
}

export interface AdminApiToken extends Schema.CollectionType {
  collectionName: 'strapi_api_tokens';
  info: {
    name: 'Api Token';
    singularName: 'api-token';
    pluralName: 'api-tokens';
    displayName: 'Api Token';
    description: '';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    name: Attribute.String &
      Attribute.Required &
      Attribute.Unique &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    description: Attribute.String &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }> &
      Attribute.DefaultTo<''>;
    type: Attribute.Enumeration<['read-only', 'full-access', 'custom']> &
      Attribute.Required &
      Attribute.DefaultTo<'read-only'>;
    accessKey: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    lastUsedAt: Attribute.DateTime;
    permissions: Attribute.Relation<
      'admin::api-token',
      'oneToMany',
      'admin::api-token-permission'
    >;
    expiresAt: Attribute.DateTime;
    lifespan: Attribute.BigInteger;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'admin::api-token',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'admin::api-token',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface AdminApiTokenPermission extends Schema.CollectionType {
  collectionName: 'strapi_api_token_permissions';
  info: {
    name: 'API Token Permission';
    description: '';
    singularName: 'api-token-permission';
    pluralName: 'api-token-permissions';
    displayName: 'API Token Permission';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    action: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    token: Attribute.Relation<
      'admin::api-token-permission',
      'manyToOne',
      'admin::api-token'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'admin::api-token-permission',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'admin::api-token-permission',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface AdminTransferToken extends Schema.CollectionType {
  collectionName: 'strapi_transfer_tokens';
  info: {
    name: 'Transfer Token';
    singularName: 'transfer-token';
    pluralName: 'transfer-tokens';
    displayName: 'Transfer Token';
    description: '';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    name: Attribute.String &
      Attribute.Required &
      Attribute.Unique &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    description: Attribute.String &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }> &
      Attribute.DefaultTo<''>;
    accessKey: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    lastUsedAt: Attribute.DateTime;
    permissions: Attribute.Relation<
      'admin::transfer-token',
      'oneToMany',
      'admin::transfer-token-permission'
    >;
    expiresAt: Attribute.DateTime;
    lifespan: Attribute.BigInteger;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'admin::transfer-token',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'admin::transfer-token',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface AdminTransferTokenPermission extends Schema.CollectionType {
  collectionName: 'strapi_transfer_token_permissions';
  info: {
    name: 'Transfer Token Permission';
    description: '';
    singularName: 'transfer-token-permission';
    pluralName: 'transfer-token-permissions';
    displayName: 'Transfer Token Permission';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    action: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    token: Attribute.Relation<
      'admin::transfer-token-permission',
      'manyToOne',
      'admin::transfer-token'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'admin::transfer-token-permission',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'admin::transfer-token-permission',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface PluginUploadFile extends Schema.CollectionType {
  collectionName: 'files';
  info: {
    singularName: 'file';
    pluralName: 'files';
    displayName: 'File';
    description: '';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    name: Attribute.String & Attribute.Required;
    alternativeText: Attribute.String;
    caption: Attribute.String;
    width: Attribute.Integer;
    height: Attribute.Integer;
    formats: Attribute.JSON;
    hash: Attribute.String & Attribute.Required;
    ext: Attribute.String;
    mime: Attribute.String & Attribute.Required;
    size: Attribute.Decimal & Attribute.Required;
    url: Attribute.String & Attribute.Required;
    previewUrl: Attribute.String;
    provider: Attribute.String & Attribute.Required;
    provider_metadata: Attribute.JSON;
    related: Attribute.Relation<'plugin::upload.file', 'morphToMany'>;
    folder: Attribute.Relation<
      'plugin::upload.file',
      'manyToOne',
      'plugin::upload.folder'
    > &
      Attribute.Private;
    folderPath: Attribute.String &
      Attribute.Required &
      Attribute.Private &
      Attribute.SetMinMax<
        {
          min: 1;
        },
        number
      >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'plugin::upload.file',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'plugin::upload.file',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface PluginUploadFolder extends Schema.CollectionType {
  collectionName: 'upload_folders';
  info: {
    singularName: 'folder';
    pluralName: 'folders';
    displayName: 'Folder';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    name: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMax<
        {
          min: 1;
        },
        number
      >;
    pathId: Attribute.Integer & Attribute.Required & Attribute.Unique;
    parent: Attribute.Relation<
      'plugin::upload.folder',
      'manyToOne',
      'plugin::upload.folder'
    >;
    children: Attribute.Relation<
      'plugin::upload.folder',
      'oneToMany',
      'plugin::upload.folder'
    >;
    files: Attribute.Relation<
      'plugin::upload.folder',
      'oneToMany',
      'plugin::upload.file'
    >;
    path: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMax<
        {
          min: 1;
        },
        number
      >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'plugin::upload.folder',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'plugin::upload.folder',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface PluginContentReleasesRelease extends Schema.CollectionType {
  collectionName: 'strapi_releases';
  info: {
    singularName: 'release';
    pluralName: 'releases';
    displayName: 'Release';
  };
  options: {
    draftAndPublish: false;
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    name: Attribute.String & Attribute.Required;
    releasedAt: Attribute.DateTime;
    scheduledAt: Attribute.DateTime;
    timezone: Attribute.String;
    actions: Attribute.Relation<
      'plugin::content-releases.release',
      'oneToMany',
      'plugin::content-releases.release-action'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'plugin::content-releases.release',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'plugin::content-releases.release',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface PluginContentReleasesReleaseAction
  extends Schema.CollectionType {
  collectionName: 'strapi_release_actions';
  info: {
    singularName: 'release-action';
    pluralName: 'release-actions';
    displayName: 'Release Action';
  };
  options: {
    draftAndPublish: false;
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    type: Attribute.Enumeration<['publish', 'unpublish']> & Attribute.Required;
    entry: Attribute.Relation<
      'plugin::content-releases.release-action',
      'morphToOne'
    >;
    contentType: Attribute.String & Attribute.Required;
    locale: Attribute.String;
    release: Attribute.Relation<
      'plugin::content-releases.release-action',
      'manyToOne',
      'plugin::content-releases.release'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'plugin::content-releases.release-action',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'plugin::content-releases.release-action',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface PluginI18NLocale extends Schema.CollectionType {
  collectionName: 'i18n_locale';
  info: {
    singularName: 'locale';
    pluralName: 'locales';
    collectionName: 'locales';
    displayName: 'Locale';
    description: '';
  };
  options: {
    draftAndPublish: false;
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    name: Attribute.String &
      Attribute.SetMinMax<
        {
          min: 1;
          max: 50;
        },
        number
      >;
    code: Attribute.String & Attribute.Unique;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'plugin::i18n.locale',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'plugin::i18n.locale',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface PluginUsersPermissionsPermission
  extends Schema.CollectionType {
  collectionName: 'up_permissions';
  info: {
    name: 'permission';
    description: '';
    singularName: 'permission';
    pluralName: 'permissions';
    displayName: 'Permission';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    action: Attribute.String & Attribute.Required;
    role: Attribute.Relation<
      'plugin::users-permissions.permission',
      'manyToOne',
      'plugin::users-permissions.role'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'plugin::users-permissions.permission',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'plugin::users-permissions.permission',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface PluginUsersPermissionsRole extends Schema.CollectionType {
  collectionName: 'up_roles';
  info: {
    name: 'role';
    description: '';
    singularName: 'role';
    pluralName: 'roles';
    displayName: 'Role';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    name: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        minLength: 3;
      }>;
    description: Attribute.String;
    type: Attribute.String & Attribute.Unique;
    permissions: Attribute.Relation<
      'plugin::users-permissions.role',
      'oneToMany',
      'plugin::users-permissions.permission'
    >;
    users: Attribute.Relation<
      'plugin::users-permissions.role',
      'oneToMany',
      'plugin::users-permissions.user'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'plugin::users-permissions.role',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'plugin::users-permissions.role',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface PluginUsersPermissionsUser extends Schema.CollectionType {
  collectionName: 'up_users';
  info: {
    name: 'user';
    description: '';
    singularName: 'user';
    pluralName: 'users';
    displayName: 'User';
  };
  options: {
    draftAndPublish: false;
  };
  attributes: {
    username: Attribute.String &
      Attribute.Required &
      Attribute.Unique &
      Attribute.SetMinMaxLength<{
        minLength: 3;
      }>;
    email: Attribute.Email &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        minLength: 6;
      }>;
    provider: Attribute.String;
    password: Attribute.Password &
      Attribute.Private &
      Attribute.SetMinMaxLength<{
        minLength: 6;
      }>;
    resetPasswordToken: Attribute.String & Attribute.Private;
    confirmationToken: Attribute.String & Attribute.Private;
    confirmed: Attribute.Boolean & Attribute.DefaultTo<false>;
    blocked: Attribute.Boolean & Attribute.DefaultTo<false>;
    role: Attribute.Relation<
      'plugin::users-permissions.user',
      'manyToOne',
      'plugin::users-permissions.role'
    >;
    company: Attribute.Relation<
      'plugin::users-permissions.user',
      'oneToOne',
      'api::company.company'
    >;
    organizational_position: Attribute.Relation<
      'plugin::users-permissions.user',
      'oneToOne',
      'api::organizational-position.organizational-position'
    >;
    created_user: Attribute.Relation<
      'plugin::users-permissions.user',
      'oneToOne',
      'plugin::users-permissions.user'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'plugin::users-permissions.user',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'plugin::users-permissions.user',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiAccountAccount extends Schema.CollectionType {
  collectionName: 'accounts';
  info: {
    singularName: 'account';
    pluralName: 'accounts';
    displayName: 'account';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    name: Attribute.String & Attribute.Required;
    description: Attribute.Text;
    status: Attribute.Boolean & Attribute.DefaultTo<true>;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::account.account',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::account.account',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiAccountHeaderAccountHeader extends Schema.CollectionType {
  collectionName: 'account_headers';
  info: {
    singularName: 'account-header';
    pluralName: 'account-headers';
    displayName: 'Account_headers';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    head_title: Attribute.String;
    description: Attribute.Text;
    status: Attribute.Boolean;
    company: Attribute.Relation<
      'api::account-header.account-header',
      'oneToOne',
      'api::company.company'
    >;
    created_user: Attribute.Relation<
      'api::account-header.account-header',
      'oneToOne',
      'plugin::users-permissions.user'
    >;
    head_type: Attribute.Integer;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::account-header.account-header',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::account-header.account-header',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiB2BRelationB2BRelation extends Schema.CollectionType {
  collectionName: 'b2b_relations';
  info: {
    singularName: 'b2b-relation';
    pluralName: 'b2b-relations';
    displayName: 'b2b_relation';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    company: Attribute.Relation<
      'api::b2b-relation.b2b-relation',
      'oneToOne',
      'api::company.company'
    >;
    client: Attribute.Relation<
      'api::b2b-relation.b2b-relation',
      'oneToOne',
      'api::company.company'
    >;
    relation_type: Attribute.Relation<
      'api::b2b-relation.b2b-relation',
      'oneToOne',
      'api::b2b-relation-type.b2b-relation-type'
    >;
    status: Attribute.Boolean;
    created_user: Attribute.Relation<
      'api::b2b-relation.b2b-relation',
      'oneToOne',
      'plugin::users-permissions.user'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::b2b-relation.b2b-relation',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::b2b-relation.b2b-relation',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiB2BRelationTypeB2BRelationType
  extends Schema.CollectionType {
  collectionName: 'b2b_relation_types';
  info: {
    singularName: 'b2b-relation-type';
    pluralName: 'b2b-relation-types';
    displayName: 'b2b_relation_type';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    title: Attribute.String & Attribute.Required & Attribute.Unique;
    status: Attribute.Boolean & Attribute.DefaultTo<true>;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::b2b-relation-type.b2b-relation-type',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::b2b-relation-type.b2b-relation-type',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiCompanyCompany extends Schema.CollectionType {
  collectionName: 'companies';
  info: {
    singularName: 'company';
    pluralName: 'companies';
    displayName: 'company';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    name: Attribute.String & Attribute.Required;
    address: Attribute.Text;
    email: Attribute.Email & Attribute.Unique;
    logo: Attribute.Media;
    code: Attribute.String;
    phone: Attribute.String;
    status: Attribute.Boolean;
    created_user: Attribute.Relation<
      'api::company.company',
      'oneToOne',
      'plugin::users-permissions.user'
    >;
    website: Attribute.String;
    legal_information: Attribute.String;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::company.company',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::company.company',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiContactPersonContactPerson extends Schema.CollectionType {
  collectionName: 'contact_people';
  info: {
    singularName: 'contact-person';
    pluralName: 'contact-people';
    displayName: 'contact_person';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    company: Attribute.Relation<
      'api::contact-person.contact-person',
      'oneToOne',
      'api::company.company'
    >;
    name: Attribute.String & Attribute.Required;
    phone: Attribute.String & Attribute.Required;
    email: Attribute.String & Attribute.Unique;
    address: Attribute.String;
    image: Attribute.Media;
    status: Attribute.Boolean & Attribute.DefaultTo<true>;
    created_user: Attribute.Relation<
      'api::contact-person.contact-person',
      'oneToOne',
      'plugin::users-permissions.user'
    >;
    contact_type: Attribute.Relation<
      'api::contact-person.contact-person',
      'oneToOne',
      'api::contact-type.contact-type'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::contact-person.contact-person',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::contact-person.contact-person',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiContactTypeContactType extends Schema.CollectionType {
  collectionName: 'contact_types';
  info: {
    singularName: 'contact-type';
    pluralName: 'contact-types';
    displayName: 'contact_type';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    title: Attribute.String & Attribute.Required & Attribute.Unique;
    status: Attribute.Boolean & Attribute.DefaultTo<true>;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::contact-type.contact-type',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::contact-type.contact-type',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiEndUserEndUser extends Schema.CollectionType {
  collectionName: 'end_users';
  info: {
    singularName: 'end-user';
    pluralName: 'end-users';
    displayName: 'EndUser';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    username: Attribute.String;
    email: Attribute.Email;
    password: Attribute.Password;
    profile: Attribute.Media;
    signature: Attribute.Media;
    confirmed: Attribute.Boolean & Attribute.DefaultTo<true>;
    end_user: Attribute.Relation<
      'api::end-user.end-user',
      'oneToOne',
      'api::end-user.end-user'
    >;
    company: Attribute.Relation<
      'api::end-user.end-user',
      'oneToOne',
      'api::company.company'
    >;
    organizational_position: Attribute.Relation<
      'api::end-user.end-user',
      'oneToOne',
      'api::organizational-position.organizational-position'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::end-user.end-user',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::end-user.end-user',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiIndividualAccountIndividualAccount
  extends Schema.CollectionType {
  collectionName: 'individual_accounts';
  info: {
    singularName: 'individual-account';
    pluralName: 'individual-accounts';
    displayName: 'individual_account';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    name: Attribute.String;
    description: Attribute.Text;
    account: Attribute.Relation<
      'api::individual-account.individual-account',
      'oneToOne',
      'api::account.account'
    >;
    sub_account: Attribute.Relation<
      'api::individual-account.individual-account',
      'oneToOne',
      'api::sub-account.sub-account'
    >;
    created_user: Attribute.Relation<
      'api::individual-account.individual-account',
      'oneToOne',
      'plugin::users-permissions.user'
    >;
    company: Attribute.Relation<
      'api::individual-account.individual-account',
      'oneToOne',
      'api::company.company'
    >;
    status: Attribute.Boolean & Attribute.DefaultTo<true>;
    short_name: Attribute.String;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::individual-account.individual-account',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::individual-account.individual-account',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiInvoiceDetailInvoiceDetail extends Schema.CollectionType {
  collectionName: 'invoice_details';
  info: {
    singularName: 'invoice-detail';
    pluralName: 'invoice-details';
    displayName: 'Invoice_details';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    vehicle_number: Attribute.String;
    container_number: Attribute.String;
    rate: Attribute.BigInteger;
    overweight: Attribute.Integer;
    invoice_master: Attribute.Relation<
      'api::invoice-detail.invoice-detail',
      'oneToOne',
      'api::invoice-master.invoice-master'
    >;
    driver_name: Attribute.String;
    driver_phone: Attribute.String;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::invoice-detail.invoice-detail',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::invoice-detail.invoice-detail',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiInvoiceMasterInvoiceMaster extends Schema.CollectionType {
  collectionName: 'invoice_masters';
  info: {
    singularName: 'invoice-master';
    pluralName: 'invoice-masters';
    displayName: 'Invoice_master';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    status: Attribute.Boolean & Attribute.DefaultTo<true>;
    date: Attribute.DateTime;
    subject: Attribute.String;
    remarks: Attribute.String;
    account_name: Attribute.String;
    account_number: Attribute.String;
    account_address: Attribute.Text;
    lc_number: Attribute.String;
    bl_number: Attribute.String;
    company: Attribute.Relation<
      'api::invoice-master.invoice-master',
      'oneToOne',
      'api::company.company'
    >;
    client: Attribute.Relation<
      'api::invoice-master.invoice-master',
      'oneToOne',
      'api::company.company'
    >;
    created_user: Attribute.Relation<
      'api::invoice-master.invoice-master',
      'oneToOne',
      'plugin::users-permissions.user'
    >;
    total_amount: Attribute.Decimal;
    invoice_no: Attribute.String;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::invoice-master.invoice-master',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::invoice-master.invoice-master',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiJournalJournal extends Schema.CollectionType {
  collectionName: 'journals';
  info: {
    singularName: 'journal';
    pluralName: 'journals';
    displayName: 'journal';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    date: Attribute.DateTime;
    description: Attribute.Text;
    reference: Attribute.String;
    company: Attribute.Relation<
      'api::journal.journal',
      'oneToOne',
      'api::company.company'
    >;
    created_user: Attribute.Relation<
      'api::journal.journal',
      'oneToOne',
      'plugin::users-permissions.user'
    >;
    client: Attribute.Relation<
      'api::journal.journal',
      'oneToOne',
      'api::company.company'
    >;
    debit_account: Attribute.Relation<
      'api::journal.journal',
      'oneToOne',
      'api::individual-account.individual-account'
    >;
    credit_account: Attribute.Relation<
      'api::journal.journal',
      'oneToOne',
      'api::individual-account.individual-account'
    >;
    amount: Attribute.Decimal;
    invoice: Attribute.Relation<
      'api::journal.journal',
      'oneToOne',
      'api::invoice-master.invoice-master'
    >;
    status: Attribute.Boolean & Attribute.DefaultTo<true>;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::journal.journal',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::journal.journal',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiJournalDetailJournalDetail extends Schema.CollectionType {
  collectionName: 'journal_details';
  info: {
    singularName: 'journal-detail';
    pluralName: 'journal-details';
    displayName: 'Journal_details';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    debit_amount: Attribute.BigInteger;
    credit_amount: Attribute.BigInteger;
    notes: Attribute.Text;
    status: Attribute.Boolean;
    journal_master: Attribute.Relation<
      'api::journal-detail.journal-detail',
      'manyToOne',
      'api::journal-master.journal-master'
    >;
    sub_head: Attribute.Relation<
      'api::journal-detail.journal-detail',
      'oneToOne',
      'api::company.company'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::journal-detail.journal-detail',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::journal-detail.journal-detail',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiJournalMasterJournalMaster extends Schema.CollectionType {
  collectionName: 'journal_masters';
  info: {
    singularName: 'journal-master';
    pluralName: 'journal-masters';
    displayName: 'Journal_master';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    journal_no: Attribute.String;
    date: Attribute.DateTime;
    journal_details: Attribute.Relation<
      'api::journal-master.journal-master',
      'oneToMany',
      'api::journal-detail.journal-detail'
    >;
    company: Attribute.Relation<
      'api::journal-master.journal-master',
      'oneToOne',
      'api::company.company'
    >;
    total_debit_amount: Attribute.Decimal;
    total_credit_amount: Attribute.Decimal;
    status: Attribute.Boolean & Attribute.DefaultTo<true>;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::journal-master.journal-master',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::journal-master.journal-master',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiMailMail extends Schema.CollectionType {
  collectionName: 'mails';
  info: {
    singularName: 'mail';
    pluralName: 'mails';
    displayName: 'mail';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    title: Attribute.String;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<'api::mail.mail', 'oneToOne', 'admin::user'> &
      Attribute.Private;
    updatedBy: Attribute.Relation<'api::mail.mail', 'oneToOne', 'admin::user'> &
      Attribute.Private;
  };
}

export interface ApiOrganizationalPositionOrganizationalPosition
  extends Schema.CollectionType {
  collectionName: 'organizational_positions';
  info: {
    singularName: 'organizational-position';
    pluralName: 'organizational-positions';
    displayName: 'organizational_position';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    title: Attribute.String;
    status: Attribute.Boolean & Attribute.DefaultTo<true>;
    description: Attribute.Text;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::organizational-position.organizational-position',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::organizational-position.organizational-position',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiQuotationQuotation extends Schema.CollectionType {
  collectionName: 'quotations';
  info: {
    singularName: 'quotation';
    pluralName: 'quotations';
    displayName: 'quotation';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    quotation_no: Attribute.String;
    subject: Attribute.String;
    client_rate: Attribute.BigInteger & Attribute.Required;
    our_rate: Attribute.BigInteger & Attribute.Required;
    no_of_items: Attribute.Integer;
    overweight: Attribute.Integer;
    lc_number: Attribute.String;
    bl_number: Attribute.String;
    remarks: Attribute.Text;
    status: Attribute.Boolean;
    client: Attribute.Relation<
      'api::quotation.quotation',
      'oneToOne',
      'api::company.company'
    >;
    company: Attribute.Relation<
      'api::quotation.quotation',
      'oneToOne',
      'api::company.company'
    >;
    created_user: Attribute.Relation<
      'api::quotation.quotation',
      'oneToOne',
      'plugin::users-permissions.user'
    >;
    send_status: Attribute.Boolean & Attribute.DefaultTo<false>;
    revision_count: Attribute.Integer & Attribute.DefaultTo<0>;
    date: Attribute.Date;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::quotation.quotation',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::quotation.quotation',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiSubAccountSubAccount extends Schema.CollectionType {
  collectionName: 'sub_accounts';
  info: {
    singularName: 'sub-account';
    pluralName: 'sub-accounts';
    displayName: 'sub_account';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    name: Attribute.String;
    description: Attribute.Text;
    status: Attribute.Boolean & Attribute.DefaultTo<true>;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::sub-account.sub-account',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::sub-account.sub-account',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiTransactionTransaction extends Schema.CollectionType {
  collectionName: 'transactions';
  info: {
    singularName: 'transaction';
    pluralName: 'transactions';
    displayName: 'transaction';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    account_headers: Attribute.Relation<
      'api::transaction.transaction',
      'oneToOne',
      'api::account-header.account-header'
    >;
    company: Attribute.Relation<
      'api::transaction.transaction',
      'oneToOne',
      'api::company.company'
    >;
    total_amount: Attribute.Integer;
    client: Attribute.Relation<
      'api::transaction.transaction',
      'oneToOne',
      'api::company.company'
    >;
    payment_option: Attribute.Integer;
    status: Attribute.Boolean & Attribute.DefaultTo<true>;
    notes: Attribute.Text;
    created_user: Attribute.Relation<
      'api::transaction.transaction',
      'oneToOne',
      'plugin::users-permissions.user'
    >;
    invoice_id: Attribute.Relation<
      'api::transaction.transaction',
      'oneToOne',
      'api::invoice-master.invoice-master'
    >;
    image: Attribute.Media;
    paid_amount: Attribute.Integer;
    due_amount: Attribute.Integer;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::transaction.transaction',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::transaction.transaction',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiUserProfileUserProfile extends Schema.CollectionType {
  collectionName: 'user_profiles';
  info: {
    singularName: 'user-profile';
    pluralName: 'user-profiles';
    displayName: 'UserProfile';
    description: '';
  };
  options: {
    draftAndPublish: false;
  };
  attributes: {
    profile: Attribute.Media;
    signature: Attribute.Media;
    address: Attribute.Text;
    phone: Attribute.String;
    user: Attribute.Relation<
      'api::user-profile.user-profile',
      'oneToOne',
      'plugin::users-permissions.user'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::user-profile.user-profile',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::user-profile.user-profile',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

declare module '@strapi/types' {
  export module Shared {
    export interface ContentTypes {
      'admin::permission': AdminPermission;
      'admin::user': AdminUser;
      'admin::role': AdminRole;
      'admin::api-token': AdminApiToken;
      'admin::api-token-permission': AdminApiTokenPermission;
      'admin::transfer-token': AdminTransferToken;
      'admin::transfer-token-permission': AdminTransferTokenPermission;
      'plugin::upload.file': PluginUploadFile;
      'plugin::upload.folder': PluginUploadFolder;
      'plugin::content-releases.release': PluginContentReleasesRelease;
      'plugin::content-releases.release-action': PluginContentReleasesReleaseAction;
      'plugin::i18n.locale': PluginI18NLocale;
      'plugin::users-permissions.permission': PluginUsersPermissionsPermission;
      'plugin::users-permissions.role': PluginUsersPermissionsRole;
      'plugin::users-permissions.user': PluginUsersPermissionsUser;
      'api::account.account': ApiAccountAccount;
      'api::account-header.account-header': ApiAccountHeaderAccountHeader;
      'api::b2b-relation.b2b-relation': ApiB2BRelationB2BRelation;
      'api::b2b-relation-type.b2b-relation-type': ApiB2BRelationTypeB2BRelationType;
      'api::company.company': ApiCompanyCompany;
      'api::contact-person.contact-person': ApiContactPersonContactPerson;
      'api::contact-type.contact-type': ApiContactTypeContactType;
      'api::end-user.end-user': ApiEndUserEndUser;
      'api::individual-account.individual-account': ApiIndividualAccountIndividualAccount;
      'api::invoice-detail.invoice-detail': ApiInvoiceDetailInvoiceDetail;
      'api::invoice-master.invoice-master': ApiInvoiceMasterInvoiceMaster;
      'api::journal.journal': ApiJournalJournal;
      'api::journal-detail.journal-detail': ApiJournalDetailJournalDetail;
      'api::journal-master.journal-master': ApiJournalMasterJournalMaster;
      'api::mail.mail': ApiMailMail;
      'api::organizational-position.organizational-position': ApiOrganizationalPositionOrganizationalPosition;
      'api::quotation.quotation': ApiQuotationQuotation;
      'api::sub-account.sub-account': ApiSubAccountSubAccount;
      'api::transaction.transaction': ApiTransactionTransaction;
      'api::user-profile.user-profile': ApiUserProfileUserProfile;
    }
  }
}
