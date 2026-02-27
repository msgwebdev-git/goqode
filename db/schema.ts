import {
  pgTable,
  serial,
  varchar,
  integer,
  boolean,
  real,
  text,
  timestamp,
  uniqueIndex,
} from "drizzle-orm/pg-core";

export const projectTypes = pgTable("project_types", {
  id: serial("id").primaryKey(),
  key: varchar("key", { length: 50 }).unique().notNull(),
  basePriceMin: integer("base_price_min").notNull(),
  basePriceMax: integer("base_price_max").notNull(),
  isMonthly: boolean("is_monthly").default(false).notNull(),
  skipDesign: boolean("skip_design").default(false).notNull(),
  sortOrder: integer("sort_order").default(0).notNull(),
});

export const designLevels = pgTable("design_levels", {
  id: serial("id").primaryKey(),
  key: varchar("key", { length: 50 }).unique().notNull(),
  multiplier: real("multiplier").notNull(),
  sortOrder: integer("sort_order").default(0).notNull(),
});

export const featureCategories = pgTable(
  "feature_categories",
  {
    id: serial("id").primaryKey(),
    projectTypeKey: varchar("project_type_key", { length: 50 })
      .notNull()
      .references(() => projectTypes.key),
    categoryKey: varchar("category_key", { length: 100 }).notNull(),
    sortOrder: integer("sort_order").default(0).notNull(),
  },
  (table) => [
    uniqueIndex("unique_project_category").on(
      table.projectTypeKey,
      table.categoryKey
    ),
  ]
);

export const features = pgTable("features", {
  id: serial("id").primaryKey(),
  categoryId: integer("category_id")
    .notNull()
    .references(() => featureCategories.id, { onDelete: "cascade" }),
  key: varchar("key", { length: 100 }).notNull(),
  priceMin: integer("price_min").notNull(),
  priceMax: integer("price_max").notNull(),
  recommended: boolean("recommended").default(false).notNull(),
  sortOrder: integer("sort_order").default(0).notNull(),
});

export const scopeModifiers = pgTable("scope_modifiers", {
  id: serial("id").primaryKey(),
  projectTypeKey: varchar("project_type_key", { length: 50 })
    .notNull()
    .references(() => projectTypes.key),
  key: varchar("key", { length: 100 }).notNull(),
  sortOrder: integer("sort_order").default(0).notNull(),
});

export const scopeModifierOptions = pgTable("scope_modifier_options", {
  id: serial("id").primaryKey(),
  scopeModifierId: integer("scope_modifier_id")
    .notNull()
    .references(() => scopeModifiers.id, { onDelete: "cascade" }),
  value: varchar("value", { length: 100 }).notNull(),
  multiplier: real("multiplier").notNull(),
  sortOrder: integer("sort_order").default(0).notNull(),
});

export const submissions = pgTable("submissions", {
  id: serial("id").primaryKey(),
  source: varchar("source", { length: 20 }).notNull(),
  name: varchar("name", { length: 200 }).notNull(),
  email: varchar("email", { length: 200 }).notNull(),
  phone: varchar("phone", { length: 50 }),
  message: text("message"),
  projectType: varchar("project_type", { length: 50 }),
  designLevel: varchar("design_level", { length: 50 }),
  features: text("features"),
  scopeModifiers: text("scope_modifiers"),
  adBudget: varchar("ad_budget", { length: 50 }),
  priceMin: integer("price_min"),
  priceMax: integer("price_max"),
  isMonthly: boolean("is_monthly").default(false),
  solutions: text("solutions"),
  serviceTypes: text("service_types"),
  budget: varchar("budget", { length: 100 }),
  labels: text("labels"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});
