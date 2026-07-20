import { redirect } from "next/navigation";

import { getCurrent } from "@/features/auth/actions";
const WorkspaceIdPage = async () => {
  // 检查登录
  const user = await getCurrent();
  // 如果用户不存在，重定向到登录页面
  if (!user) redirect("/sign-in");

  return <div>Workspace Id</div>;
};
export default WorkspaceIdPage;
