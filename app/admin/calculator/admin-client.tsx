"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import * as api from "@/lib/calculator-api";

// ─── Human-readable labels for keys ─────────────────

const PROJECT_TYPE_LABELS: Record<string, string> = {
  "0": "Landing Page",
  "1": "E-commerce",
  "2": "Corporate Website",
  "3": "Web Application",
  "4": "Mobile Application",
  "5": "Branding",
  "6": "Marketing",
};

const DESIGN_LEVEL_LABELS: Record<string, string> = {
  "0": "Template",
  "1": "Semi-custom",
  "2": "Fully custom",
};

// ─── Types ──────────────────────────────────────────

type ProjectType = {
  id: number;
  key: string;
  basePriceMin: number;
  basePriceMax: number;
  isMonthly: boolean;
  skipDesign: boolean;
  sortOrder: number;
};

type DesignLevel = {
  id: number;
  key: string;
  multiplier: number;
  sortOrder: number;
};

type FeatureCategory = {
  id: number;
  projectTypeKey: string;
  categoryKey: string;
  sortOrder: number;
};

type Feature = {
  id: number;
  categoryId: number;
  key: string;
  priceMin: number;
  priceMax: number;
  recommended: boolean;
  sortOrder: number;
};

type ScopeModifier = {
  id: number;
  projectTypeKey: string;
  key: string;
  sortOrder: number;
};

type ScopeModifierOption = {
  id: number;
  scopeModifierId: number;
  value: string;
  multiplier: number;
  sortOrder: number;
};

type Props = {
  token: string;
  projectTypes: ProjectType[];
  designLevels: DesignLevel[];
  featureCategories: FeatureCategory[];
  features: Feature[];
  scopeModifiers: ScopeModifier[];
  scopeModifierOptions: ScopeModifierOption[];
};

// ─── Inline edit helper ─────────────────────────────

function EditableCell({
  value,
  onChange,
  type = "text",
  className = "",
}: {
  value: string | number;
  onChange: (v: string) => void;
  type?: string;
  className?: string;
}) {
  return (
    <Input
      type={type}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className={`h-8 text-sm ${className}`}
    />
  );
}

// ═══════════════════════════════════════════════════════
// ADMIN CLIENT
// ═══════════════════════════════════════════════════════

export function AdminClient(props: Props) {
  const { token } = props;

  return (
    <div className="max-w-6xl">
      <h2 className="text-2xl font-bold mb-6 text-foreground">Calculator Config</h2>
      <Tabs defaultValue="projectTypes" className="w-full">
        <TabsList className="mb-6">
          <TabsTrigger value="projectTypes">Project Types</TabsTrigger>
          <TabsTrigger value="designLevels">Design Levels</TabsTrigger>
          <TabsTrigger value="features">Features</TabsTrigger>
          <TabsTrigger value="scope">Scope Modifiers</TabsTrigger>
        </TabsList>

        <TabsContent value="projectTypes">
          <ProjectTypesTab data={props.projectTypes} token={token} />
        </TabsContent>
        <TabsContent value="designLevels">
          <DesignLevelsTab data={props.designLevels} token={token} />
        </TabsContent>
        <TabsContent value="features">
          <FeaturesTab
            projectTypes={props.projectTypes}
            categories={props.featureCategories}
            features={props.features}
            token={token}
          />
        </TabsContent>
        <TabsContent value="scope">
          <ScopeTab
            projectTypes={props.projectTypes}
            modifiers={props.scopeModifiers}
            options={props.scopeModifierOptions}
            token={token}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
}

// ─── Project Types Tab ──────────────────────────────

function ProjectTypesTab({ data, token }: { data: ProjectType[]; token: string }) {
  const [rows, setRows] = useState(data);
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  function update(id: number, field: string, value: string | boolean) {
    setRows((prev) =>
      prev.map((r) => (r.id === id ? { ...r, [field]: value } : r)),
    );
  }

  function save(row: ProjectType) {
    startTransition(async () => {
      await api.updateProjectType(token, row.id, {
        basePriceMin: Number(row.basePriceMin),
        basePriceMax: Number(row.basePriceMax),
        isMonthly: row.isMonthly,
        skipDesign: row.skipDesign,
        sortOrder: Number(row.sortOrder),
      });
      router.refresh();
    });
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Key</TableHead>
          <TableHead>Name</TableHead>
          <TableHead>Min Price</TableHead>
          <TableHead>Max Price</TableHead>
          <TableHead>Monthly</TableHead>
          <TableHead>Skip Design</TableHead>
          <TableHead>Sort</TableHead>
          <TableHead></TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {rows.map((row) => (
          <TableRow key={row.id}>
            <TableCell className="font-mono text-sm">{row.key}</TableCell>
            <TableCell className="text-sm text-muted-foreground">{PROJECT_TYPE_LABELS[row.key] || row.key}</TableCell>
            <TableCell>
              <EditableCell
                type="number"
                value={row.basePriceMin}
                onChange={(v) => update(row.id, "basePriceMin", v)}
                className="w-24"
              />
            </TableCell>
            <TableCell>
              <EditableCell
                type="number"
                value={row.basePriceMax}
                onChange={(v) => update(row.id, "basePriceMax", v)}
                className="w-24"
              />
            </TableCell>
            <TableCell>
              <Switch
                checked={row.isMonthly}
                onCheckedChange={(v) => update(row.id, "isMonthly", v)}
              />
            </TableCell>
            <TableCell>
              <Switch
                checked={row.skipDesign}
                onCheckedChange={(v) => update(row.id, "skipDesign", v)}
              />
            </TableCell>
            <TableCell>
              <EditableCell
                type="number"
                value={row.sortOrder}
                onChange={(v) => update(row.id, "sortOrder", v)}
                className="w-16"
              />
            </TableCell>
            <TableCell>
              <Button
                size="sm"
                variant="outline"
                onClick={() => save(row)}
                disabled={isPending}
              >
                Save
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

// ─── Design Levels Tab ──────────────────────────────

function DesignLevelsTab({ data, token }: { data: DesignLevel[]; token: string }) {
  const [rows, setRows] = useState(data);
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  function update(id: number, field: string, value: string) {
    setRows((prev) =>
      prev.map((r) => (r.id === id ? { ...r, [field]: value } : r)),
    );
  }

  function save(row: DesignLevel) {
    startTransition(async () => {
      await api.updateDesignLevel(token, row.id, {
        multiplier: Number(row.multiplier),
        sortOrder: Number(row.sortOrder),
      });
      router.refresh();
    });
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Key</TableHead>
          <TableHead>Name</TableHead>
          <TableHead>Multiplier</TableHead>
          <TableHead>Sort</TableHead>
          <TableHead></TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {rows.map((row) => (
          <TableRow key={row.id}>
            <TableCell className="font-mono text-sm">{row.key}</TableCell>
            <TableCell className="text-sm text-muted-foreground">{DESIGN_LEVEL_LABELS[row.key] || row.key}</TableCell>
            <TableCell>
              <EditableCell
                type="number"
                value={row.multiplier}
                onChange={(v) => update(row.id, "multiplier", v)}
                className="w-24"
              />
            </TableCell>
            <TableCell>
              <EditableCell
                type="number"
                value={row.sortOrder}
                onChange={(v) => update(row.id, "sortOrder", v)}
                className="w-16"
              />
            </TableCell>
            <TableCell>
              <Button
                size="sm"
                variant="outline"
                onClick={() => save(row)}
                disabled={isPending}
              >
                Save
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

// ─── Features Tab ───────────────────────────────────

function FeaturesTab({
  projectTypes,
  categories,
  features: allFeatures,
  token,
}: {
  projectTypes: ProjectType[];
  categories: FeatureCategory[];
  features: Feature[];
  token: string;
}) {
  const [selectedPT, setSelectedPT] = useState(projectTypes[0]?.key || "");
  const [catRows, setCatRows] = useState(categories);
  const [featRows, setFeatRows] = useState(allFeatures);
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  // New category form
  const [newCatKey, setNewCatKey] = useState("");
  // New feature form
  const [addingTo, setAddingTo] = useState<number | null>(null);
  const [newFeat, setNewFeat] = useState({ key: "", priceMin: "0", priceMax: "0", recommended: false });

  const ptCategories = catRows.filter((c) => c.projectTypeKey === selectedPT);

  function refresh() {
    router.refresh();
  }

  // ── Category actions ──
  function handleAddCategory() {
    if (!newCatKey.trim()) return;
    startTransition(async () => {
      const row = await api.addFeatureCategory(token, {
        projectTypeKey: selectedPT,
        categoryKey: newCatKey.trim(),
        sortOrder: ptCategories.length,
      });
      setCatRows((prev) => [...prev, row]);
      setNewCatKey("");
      refresh();
    });
  }

  function handleUpdateCategory(cat: FeatureCategory) {
    startTransition(async () => {
      await api.updateFeatureCategory(token, cat.id, {
        categoryKey: cat.categoryKey,
        sortOrder: cat.sortOrder,
      });
      refresh();
    });
  }

  function handleDeleteCategory(id: number) {
    if (!confirm("Delete this category and all its features?")) return;
    startTransition(async () => {
      await api.deleteFeatureCategory(token, id);
      setCatRows((prev) => prev.filter((c) => c.id !== id));
      setFeatRows((prev) => prev.filter((f) => f.categoryId !== id));
      refresh();
    });
  }

  // ── Feature actions ──
  function handleAddFeature(categoryId: number) {
    if (!newFeat.key.trim()) return;
    startTransition(async () => {
      const catFeats = featRows.filter((f) => f.categoryId === categoryId);
      const row = await api.addFeature(token, {
        categoryId,
        key: newFeat.key.trim(),
        priceMin: Number(newFeat.priceMin),
        priceMax: Number(newFeat.priceMax),
        recommended: newFeat.recommended,
        sortOrder: catFeats.length,
      });
      setFeatRows((prev) => [...prev, row]);
      setNewFeat({ key: "", priceMin: "0", priceMax: "0", recommended: false });
      setAddingTo(null);
      refresh();
    });
  }

  function handleUpdateFeature(feat: Feature) {
    startTransition(async () => {
      await api.updateFeature(token, feat.id, {
        key: feat.key,
        priceMin: Number(feat.priceMin),
        priceMax: Number(feat.priceMax),
        recommended: feat.recommended,
        sortOrder: Number(feat.sortOrder),
      });
      refresh();
    });
  }

  function handleDeleteFeature(id: number) {
    if (!confirm("Delete this feature?")) return;
    startTransition(async () => {
      await api.deleteFeature(token, id);
      setFeatRows((prev) => prev.filter((f) => f.id !== id));
      refresh();
    });
  }

  function updateFeatRow(id: number, field: string, value: string | boolean) {
    setFeatRows((prev) =>
      prev.map((f) => (f.id === id ? { ...f, [field]: value } : f)),
    );
  }

  return (
    <div className="flex flex-col gap-6">
      {/* Project type selector */}
      <div className="flex items-center gap-3">
        <Label>Project Type:</Label>
        <Select value={selectedPT} onValueChange={setSelectedPT}>
          <SelectTrigger className="w-48">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {projectTypes.map((pt) => (
              <SelectItem key={pt.key} value={pt.key}>
                {pt.key} — {PROJECT_TYPE_LABELS[pt.key] || pt.key}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Categories + features */}
      {ptCategories.map((cat) => {
        const catFeats = featRows.filter((f) => f.categoryId === cat.id);
        return (
          <div key={cat.id} className="border border-zinc-200 dark:border-zinc-800 rounded-xl p-4">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <Input
                  value={cat.categoryKey}
                  onChange={(e) =>
                    setCatRows((prev) =>
                      prev.map((c) =>
                        c.id === cat.id ? { ...c, categoryKey: e.target.value } : c,
                      ),
                    )
                  }
                  className="h-8 w-48 font-mono text-sm"
                />
                <Input
                  type="number"
                  value={cat.sortOrder}
                  onChange={(e) =>
                    setCatRows((prev) =>
                      prev.map((c) =>
                        c.id === cat.id ? { ...c, sortOrder: Number(e.target.value) } : c,
                      ),
                    )
                  }
                  className="h-8 w-16"
                />
                <Button size="sm" variant="outline" onClick={() => handleUpdateCategory(cat)} disabled={isPending}>
                  Save
                </Button>
              </div>
              <Button size="sm" variant="destructive" onClick={() => handleDeleteCategory(cat.id)} disabled={isPending}>
                Delete
              </Button>
            </div>

            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Key</TableHead>
                  <TableHead>Min</TableHead>
                  <TableHead>Max</TableHead>
                  <TableHead>Recommended</TableHead>
                  <TableHead>Sort</TableHead>
                  <TableHead></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {catFeats.map((feat) => (
                  <TableRow key={feat.id}>
                    <TableCell>
                      <EditableCell
                        value={feat.key}
                        onChange={(v) => updateFeatRow(feat.id, "key", v)}
                        className="w-40"
                      />
                    </TableCell>
                    <TableCell>
                      <EditableCell
                        type="number"
                        value={feat.priceMin}
                        onChange={(v) => updateFeatRow(feat.id, "priceMin", v)}
                        className="w-20"
                      />
                    </TableCell>
                    <TableCell>
                      <EditableCell
                        type="number"
                        value={feat.priceMax}
                        onChange={(v) => updateFeatRow(feat.id, "priceMax", v)}
                        className="w-20"
                      />
                    </TableCell>
                    <TableCell>
                      <Switch
                        checked={feat.recommended}
                        onCheckedChange={(v) => updateFeatRow(feat.id, "recommended", v)}
                      />
                    </TableCell>
                    <TableCell>
                      <EditableCell
                        type="number"
                        value={feat.sortOrder}
                        onChange={(v) => updateFeatRow(feat.id, "sortOrder", v)}
                        className="w-16"
                      />
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-1">
                        <Button size="sm" variant="outline" onClick={() => handleUpdateFeature(feat)} disabled={isPending}>
                          Save
                        </Button>
                        <Button size="sm" variant="destructive" onClick={() => handleDeleteFeature(feat.id)} disabled={isPending}>
                          Del
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}

                {/* Add feature row */}
                {addingTo === cat.id ? (
                  <TableRow>
                    <TableCell>
                      <Input
                        value={newFeat.key}
                        onChange={(e) => setNewFeat((p) => ({ ...p, key: e.target.value }))}
                        placeholder="key"
                        className="h-8 w-40"
                      />
                    </TableCell>
                    <TableCell>
                      <Input
                        type="number"
                        value={newFeat.priceMin}
                        onChange={(e) => setNewFeat((p) => ({ ...p, priceMin: e.target.value }))}
                        className="h-8 w-20"
                      />
                    </TableCell>
                    <TableCell>
                      <Input
                        type="number"
                        value={newFeat.priceMax}
                        onChange={(e) => setNewFeat((p) => ({ ...p, priceMax: e.target.value }))}
                        className="h-8 w-20"
                      />
                    </TableCell>
                    <TableCell>
                      <Switch
                        checked={newFeat.recommended}
                        onCheckedChange={(v) => setNewFeat((p) => ({ ...p, recommended: v }))}
                      />
                    </TableCell>
                    <TableCell></TableCell>
                    <TableCell>
                      <div className="flex gap-1">
                        <Button size="sm" onClick={() => handleAddFeature(cat.id)} disabled={isPending}>
                          Add
                        </Button>
                        <Button size="sm" variant="outline" onClick={() => setAddingTo(null)}>
                          Cancel
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ) : (
                  <TableRow>
                    <TableCell colSpan={6}>
                      <Button size="sm" variant="ghost" onClick={() => setAddingTo(cat.id)}>
                        + Add Feature
                      </Button>
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        );
      })}

      {/* Add category */}
      <div className="flex items-center gap-2">
        <Input
          value={newCatKey}
          onChange={(e) => setNewCatKey(e.target.value)}
          placeholder="New category key"
          className="w-48"
        />
        <Button onClick={handleAddCategory} disabled={isPending || !newCatKey.trim()}>
          + Add Category
        </Button>
      </div>
    </div>
  );
}

// ─── Scope Modifiers Tab ────────────────────────────

function ScopeTab({
  projectTypes,
  modifiers,
  options: allOptions,
  token,
}: {
  projectTypes: ProjectType[];
  modifiers: ScopeModifier[];
  options: ScopeModifierOption[];
  token: string;
}) {
  const [selectedPT, setSelectedPT] = useState(projectTypes[0]?.key || "");
  const [modRows, setModRows] = useState(modifiers);
  const [optRows, setOptRows] = useState(allOptions);
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  // New modifier form
  const [newModKey, setNewModKey] = useState("");
  // New option form
  const [addingOptTo, setAddingOptTo] = useState<number | null>(null);
  const [newOpt, setNewOpt] = useState({ value: "", multiplier: "1.0" });

  const ptModifiers = modRows.filter((m) => m.projectTypeKey === selectedPT);

  function refresh() {
    router.refresh();
  }

  // ── Modifier actions ──
  function handleAddModifier() {
    if (!newModKey.trim()) return;
    startTransition(async () => {
      const row = await api.addScopeModifier(token, {
        projectTypeKey: selectedPT,
        key: newModKey.trim(),
        sortOrder: ptModifiers.length,
      });
      setModRows((prev) => [...prev, row]);
      setNewModKey("");
      refresh();
    });
  }

  function handleUpdateModifier(mod: ScopeModifier) {
    startTransition(async () => {
      await api.updateScopeModifier(token, mod.id, { key: mod.key, sortOrder: mod.sortOrder });
      refresh();
    });
  }

  function handleDeleteModifier(id: number) {
    if (!confirm("Delete this modifier and all its options?")) return;
    startTransition(async () => {
      await api.deleteScopeModifier(token, id);
      setModRows((prev) => prev.filter((m) => m.id !== id));
      setOptRows((prev) => prev.filter((o) => o.scopeModifierId !== id));
      refresh();
    });
  }

  // ── Option actions ──
  function handleAddOption(modifierId: number) {
    if (!newOpt.value.trim()) return;
    startTransition(async () => {
      const modOpts = optRows.filter((o) => o.scopeModifierId === modifierId);
      const row = await api.addScopeModifierOption(token, {
        scopeModifierId: modifierId,
        value: newOpt.value.trim(),
        multiplier: Number(newOpt.multiplier),
        sortOrder: modOpts.length,
      });
      setOptRows((prev) => [...prev, row]);
      setNewOpt({ value: "", multiplier: "1.0" });
      setAddingOptTo(null);
      refresh();
    });
  }

  function handleUpdateOption(opt: ScopeModifierOption) {
    startTransition(async () => {
      await api.updateScopeModifierOption(token, opt.id, {
        value: opt.value,
        multiplier: Number(opt.multiplier),
        sortOrder: Number(opt.sortOrder),
      });
      refresh();
    });
  }

  function handleDeleteOption(id: number) {
    if (!confirm("Delete this option?")) return;
    startTransition(async () => {
      await api.deleteScopeModifierOption(token, id);
      setOptRows((prev) => prev.filter((o) => o.id !== id));
      refresh();
    });
  }

  function updateOptRow(id: number, field: string, value: string) {
    setOptRows((prev) =>
      prev.map((o) => (o.id === id ? { ...o, [field]: value } : o)),
    );
  }

  return (
    <div className="flex flex-col gap-6">
      {/* Project type selector */}
      <div className="flex items-center gap-3">
        <Label>Project Type:</Label>
        <Select value={selectedPT} onValueChange={setSelectedPT}>
          <SelectTrigger className="w-48">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {projectTypes.map((pt) => (
              <SelectItem key={pt.key} value={pt.key}>
                {pt.key} — {PROJECT_TYPE_LABELS[pt.key] || pt.key}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Modifiers + options */}
      {ptModifiers.map((mod) => {
        const modOpts = optRows.filter((o) => o.scopeModifierId === mod.id);
        return (
          <div key={mod.id} className="border border-zinc-200 dark:border-zinc-800 rounded-xl p-4">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <Input
                  value={mod.key}
                  onChange={(e) =>
                    setModRows((prev) =>
                      prev.map((m) =>
                        m.id === mod.id ? { ...m, key: e.target.value } : m,
                      ),
                    )
                  }
                  className="h-8 w-48 font-mono text-sm"
                />
                <Input
                  type="number"
                  value={mod.sortOrder}
                  onChange={(e) =>
                    setModRows((prev) =>
                      prev.map((m) =>
                        m.id === mod.id ? { ...m, sortOrder: Number(e.target.value) } : m,
                      ),
                    )
                  }
                  className="h-8 w-16"
                />
                <Button size="sm" variant="outline" onClick={() => handleUpdateModifier(mod)} disabled={isPending}>
                  Save
                </Button>
              </div>
              <Button size="sm" variant="destructive" onClick={() => handleDeleteModifier(mod.id)} disabled={isPending}>
                Delete
              </Button>
            </div>

            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Value</TableHead>
                  <TableHead>Multiplier</TableHead>
                  <TableHead>Sort</TableHead>
                  <TableHead></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {modOpts.map((opt) => (
                  <TableRow key={opt.id}>
                    <TableCell>
                      <EditableCell
                        value={opt.value}
                        onChange={(v) => updateOptRow(opt.id, "value", v)}
                        className="w-32"
                      />
                    </TableCell>
                    <TableCell>
                      <EditableCell
                        type="number"
                        value={opt.multiplier}
                        onChange={(v) => updateOptRow(opt.id, "multiplier", v)}
                        className="w-24"
                      />
                    </TableCell>
                    <TableCell>
                      <EditableCell
                        type="number"
                        value={opt.sortOrder}
                        onChange={(v) => updateOptRow(opt.id, "sortOrder", v)}
                        className="w-16"
                      />
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-1">
                        <Button size="sm" variant="outline" onClick={() => handleUpdateOption(opt)} disabled={isPending}>
                          Save
                        </Button>
                        <Button size="sm" variant="destructive" onClick={() => handleDeleteOption(opt.id)} disabled={isPending}>
                          Del
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}

                {/* Add option row */}
                {addingOptTo === mod.id ? (
                  <TableRow>
                    <TableCell>
                      <Input
                        value={newOpt.value}
                        onChange={(e) => setNewOpt((p) => ({ ...p, value: e.target.value }))}
                        placeholder="value"
                        className="h-8 w-32"
                      />
                    </TableCell>
                    <TableCell>
                      <Input
                        type="number"
                        value={newOpt.multiplier}
                        onChange={(e) => setNewOpt((p) => ({ ...p, multiplier: e.target.value }))}
                        className="h-8 w-24"
                      />
                    </TableCell>
                    <TableCell></TableCell>
                    <TableCell>
                      <div className="flex gap-1">
                        <Button size="sm" onClick={() => handleAddOption(mod.id)} disabled={isPending}>
                          Add
                        </Button>
                        <Button size="sm" variant="outline" onClick={() => setAddingOptTo(null)}>
                          Cancel
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ) : (
                  <TableRow>
                    <TableCell colSpan={4}>
                      <Button size="sm" variant="ghost" onClick={() => setAddingOptTo(mod.id)}>
                        + Add Option
                      </Button>
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        );
      })}

      {/* Add modifier */}
      <div className="flex items-center gap-2">
        <Input
          value={newModKey}
          onChange={(e) => setNewModKey(e.target.value)}
          placeholder="New modifier key"
          className="w-48"
        />
        <Button onClick={handleAddModifier} disabled={isPending || !newModKey.trim()}>
          + Add Modifier
        </Button>
      </div>
    </div>
  );
}
