const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";

// ─── Types ───

export type CalculatorConfig = {
  projectTypeKeys: string[];
  monthlyTypes: string[];
  skipDesignTypes: string[];
  basePrices: Record<string, [number, number]>;
  designMultipliers: Record<string, number>;
  designLevelKeys: string[];
  categorizedFeatures: Record<
    string,
    Array<{
      categoryKey: string;
      features: Array<{
        key: string;
        price: [number, number];
        recommended?: boolean;
      }>;
    }>
  >;
  scopeModifiers: Record<
    string,
    Array<{
      key: string;
      options: Array<{ value: string; multiplier: number }>;
    }>
  >;
};

export interface Submission {
  id: number;
  source: string;
  name: string;
  email: string;
  phone: string | null;
  message: string | null;
  projectType: string | null;
  designLevel: string | null;
  features: string | null;
  scopeModifiers: string | null;
  adBudget: string | null;
  priceMin: number | null;
  priceMax: number | null;
  isMonthly: boolean | null;
  solutions: string | null;
  serviceTypes: string | null;
  budget: string | null;
  labels: string | null;
  createdAt: string;
}

// ─── Public API ───

export async function getCalculatorConfig(): Promise<CalculatorConfig> {
  const res = await fetch(`${API_URL}/api/calculator/config`, {
    next: { revalidate: 60 },
  });
  if (!res.ok) throw new Error("Failed to fetch calculator config");
  return res.json();
}

export async function submitCalculatorForm(data: {
  name: string;
  email: string;
  phone: string;
  description: string;
  projectType: string;
  designLevel: string | null;
  features: string[];
  scopeModifiers: Record<string, string>;
  adBudget: string | null;
  priceMin: number;
  priceMax: number;
  isMonthly: boolean;
  labels: {
    projectType: string;
    designLevel: string;
    scopeModifiers: { label: string; value: string }[];
    features: { name: string; priceMin: number; priceMax: number }[];
    adBudget: string;
  };
}): Promise<{ success: boolean; id?: number; error?: string }> {
  const res = await fetch(`${API_URL}/api/submissions/calculator`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return res.json();
}

export async function submitContactForm(data: {
  name: string;
  email: string;
  phone: string;
  message: string;
  solutions: string[];
  serviceTypes: string[];
  budget: string;
}): Promise<{ success: boolean; id?: number; error?: string }> {
  const res = await fetch(`${API_URL}/api/submissions/contact`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return res.json();
}

// ─── Admin API ───

function adminHeaders(token: string) {
  return {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };
}

export async function getAdminCalculatorConfig(token: string) {
  const res = await fetch(`${API_URL}/api/admin/calculator/config`, {
    headers: adminHeaders(token),
  });
  if (!res.ok) throw new Error("Failed to fetch admin calculator config");
  return res.json();
}

export async function updateProjectType(
  token: string,
  id: number,
  data: { basePriceMin?: number; basePriceMax?: number; isMonthly?: boolean; skipDesign?: boolean; sortOrder?: number }
) {
  const res = await fetch(`${API_URL}/api/admin/calculator/project-types/${id}`, {
    method: "PUT",
    headers: adminHeaders(token),
    body: JSON.stringify(data),
  });
  return res.json();
}

export async function updateDesignLevel(
  token: string,
  id: number,
  data: { multiplier?: number; sortOrder?: number }
) {
  const res = await fetch(`${API_URL}/api/admin/calculator/design-levels/${id}`, {
    method: "PUT",
    headers: adminHeaders(token),
    body: JSON.stringify(data),
  });
  return res.json();
}

export async function addFeatureCategory(
  token: string,
  data: { projectTypeKey: string; categoryKey: string; sortOrder?: number }
) {
  const res = await fetch(`${API_URL}/api/admin/calculator/feature-categories`, {
    method: "POST",
    headers: adminHeaders(token),
    body: JSON.stringify(data),
  });
  return res.json();
}

export async function updateFeatureCategory(
  token: string,
  id: number,
  data: { categoryKey?: string; sortOrder?: number }
) {
  const res = await fetch(`${API_URL}/api/admin/calculator/feature-categories/${id}`, {
    method: "PUT",
    headers: adminHeaders(token),
    body: JSON.stringify(data),
  });
  return res.json();
}

export async function deleteFeatureCategory(token: string, id: number) {
  const res = await fetch(`${API_URL}/api/admin/calculator/feature-categories/${id}`, {
    method: "DELETE",
    headers: adminHeaders(token),
  });
  return res.json();
}

export async function addFeature(
  token: string,
  data: { categoryId: number; key: string; priceMin: number; priceMax: number; recommended?: boolean; sortOrder?: number }
) {
  const res = await fetch(`${API_URL}/api/admin/calculator/features`, {
    method: "POST",
    headers: adminHeaders(token),
    body: JSON.stringify(data),
  });
  return res.json();
}

export async function updateFeature(
  token: string,
  id: number,
  data: { key?: string; priceMin?: number; priceMax?: number; recommended?: boolean; sortOrder?: number }
) {
  const res = await fetch(`${API_URL}/api/admin/calculator/features/${id}`, {
    method: "PUT",
    headers: adminHeaders(token),
    body: JSON.stringify(data),
  });
  return res.json();
}

export async function deleteFeature(token: string, id: number) {
  const res = await fetch(`${API_URL}/api/admin/calculator/features/${id}`, {
    method: "DELETE",
    headers: adminHeaders(token),
  });
  return res.json();
}

export async function addScopeModifier(
  token: string,
  data: { projectTypeKey: string; key: string; sortOrder?: number }
) {
  const res = await fetch(`${API_URL}/api/admin/calculator/scope-modifiers`, {
    method: "POST",
    headers: adminHeaders(token),
    body: JSON.stringify(data),
  });
  return res.json();
}

export async function updateScopeModifier(
  token: string,
  id: number,
  data: { key?: string; sortOrder?: number }
) {
  const res = await fetch(`${API_URL}/api/admin/calculator/scope-modifiers/${id}`, {
    method: "PUT",
    headers: adminHeaders(token),
    body: JSON.stringify(data),
  });
  return res.json();
}

export async function deleteScopeModifier(token: string, id: number) {
  const res = await fetch(`${API_URL}/api/admin/calculator/scope-modifiers/${id}`, {
    method: "DELETE",
    headers: adminHeaders(token),
  });
  return res.json();
}

export async function addScopeModifierOption(
  token: string,
  data: { scopeModifierId: number; value: string; multiplier: number; sortOrder?: number }
) {
  const res = await fetch(`${API_URL}/api/admin/calculator/scope-modifier-options`, {
    method: "POST",
    headers: adminHeaders(token),
    body: JSON.stringify(data),
  });
  return res.json();
}

export async function updateScopeModifierOption(
  token: string,
  id: number,
  data: { value?: string; multiplier?: number; sortOrder?: number }
) {
  const res = await fetch(`${API_URL}/api/admin/calculator/scope-modifier-options/${id}`, {
    method: "PUT",
    headers: adminHeaders(token),
    body: JSON.stringify(data),
  });
  return res.json();
}

export async function deleteScopeModifierOption(token: string, id: number) {
  const res = await fetch(`${API_URL}/api/admin/calculator/scope-modifier-options/${id}`, {
    method: "DELETE",
    headers: adminHeaders(token),
  });
  return res.json();
}

// ─── Admin Submissions ───

export async function getAdminSubmissions(token: string): Promise<Submission[]> {
  const res = await fetch(`${API_URL}/api/admin/submissions`, {
    headers: adminHeaders(token),
  });
  if (!res.ok) throw new Error("Failed to fetch submissions");
  return res.json();
}

export async function getAdminSubmission(token: string, id: number): Promise<Submission | null> {
  const res = await fetch(`${API_URL}/api/admin/submissions/${id}`, {
    headers: adminHeaders(token),
  });
  if (!res.ok) return null;
  return res.json();
}

export async function deleteAdminSubmission(token: string, id: number) {
  const res = await fetch(`${API_URL}/api/admin/submissions/${id}`, {
    method: "DELETE",
    headers: adminHeaders(token),
  });
  return res.json();
}

// ─── Submission by ID (public, for thank-you page) ───

export async function getSubmissionById(id: number): Promise<Submission | null> {
  const res = await fetch(`${API_URL}/api/submissions/${id}`, {
    cache: "no-store",
  });
  if (!res.ok) return null;
  return res.json();
}
