/* eslint-disable react/jsx-props-no-spreading */
import { lazy, Suspense } from "react";
import dynamicIconImports from "lucide-react/dynamicIconImports";
import { observer } from "mobx-react-lite";

const fallback = <div className="h-[24px] w-[24px] bg-slate-200 rounded-sm" />;

const LucideIcon = observer(({ name, ...props }) => {
  const Icon = lazy(dynamicIconImports[name]);
  return (
    <Suspense fallback={fallback}>
      <Icon strokeWidth={1.5} size={20} {...props} />
    </Suspense>
  );
});

export default LucideIcon;
