import { redirect } from "next/navigation";

import { getCurrent } from "@/features/auth/queries";
import { WorkspaceIdClient } from "./client";
const WorkspaceIdPage = async () => {
  // 检查登录
  const user = await getCurrent();
  // 如果用户不存在，重定向到登录页面
  if (!user) redirect("/sign-in");

  return <WorkspaceIdClient />;
};
export default WorkspaceIdPage;
