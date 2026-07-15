import { getCurrent } from "@/features/auth/actions";
import { redirect } from "next/navigation";

export default async function Home() {
  // 获取当前用户状态
  const user = await getCurrent();
  // 如果用户不存在，重定向到登录页面
  if (!user) redirect("/sign-in");
  return (
    <div>
      This is a home page
    </div>
  );
}
