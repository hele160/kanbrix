import { getCurrent } from "@/features/auth/actions";
import { getWorkspaces } from "@/features/workspaces/actions";
import { redirect } from "next/navigation";

export default async function Home() {
  // 获取当前用户状态
  const user = await getCurrent();
  // 如果用户不存在，重定向到登录页面
  if (!user) redirect("/sign-in");

  // 获取workspaces列表通过判断是否有workspace来重定向到特定页面
  const workspaces = await getWorkspaces();
  if (workspaces.total === 0) {
    redirect("/workspaces/create");
  } else {
    // 默认重定向到第一个workspace
    redirect(`/workspaces/${workspaces.documents[0].$id}`);
  }
}
