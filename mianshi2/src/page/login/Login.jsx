import { useState } from "react";
import { Link } from "react-router-dom";
import store from "../../store";
import { Form, Input, Button } from "antd";
import Center from "../../components/center/center";
import "./login.scss";

function Login() {
	const [form, setForm] = useState({
		username: "",
		phone: "",
		password: "",
	});
	const stateChange = (key, e) => {
		setForm({ ...form, [key]: e.target.value });
	};
	const onFinish = (values) => {
		// console.log("Success:", values);
		const login = store.getState().userInfo;
		setForm({
			username: values.username,
			password: values.password,
		});
		if (form.username === login.username && form.password === login.password) {
			store.dispatch({
				type: "LOGIN",
			});
			console.log("登录成功！");
		} else {
			console.log("登录失败！");
		}
	};

	return (
		<div className="login">
			<Center>
				<h1 className="login_title">登录</h1>
				<Form
					className="login_form"
					style={{ minWidth: "250px" }}
					onFinish={onFinish}>
					<Form.Item
						name="username"
						rules={[
							{
								required: true,
								message: "请输入用户名!",
							},
							{ max: 6, message: "用户名最多6位！" },
						]}>
						<Input
							placeholder="请输入用户名！"
							onChange={stateChange.bind(this, "username")}
						/>
					</Form.Item>

					<Form.Item
						name="password"
						rules={[
							{
								validator: (rule, value) => {
									let reg =
										/^\S*(?=\S{6,})(?=\S*\d)(?=\S*[A-Z])(?=\S*[a-z])(?=\S*[!@#$%^&*? ])\S*$/;
									if (reg.test(value)) {
										return Promise.resolve();
									}
									return Promise.reject(
										"最少6位，包括至少1个大写字母，1个小写字母，1个数字，1个特殊字符"
									);
								},
							},
						]}>
						<Input.Password
							placeholder="请输入密码"
							onChange={stateChange.bind(this, "password")}
						/>
					</Form.Item>
					<Form.Item>
						<Button
							className="login_btn"
							block={true}
							type="primary"
							htmlType="submit">
							登录
						</Button>
					</Form.Item>
					<Form.Item>
						<div className="login_more">
							<span>
								<Link to="/forget">忘记密码？</Link>
							</span>
							<span>
								没有账号？<Link to="/register">立即注册</Link>
							</span>
						</div>
					</Form.Item>
				</Form>
			</Center>
		</div>
	);
}
export default Login;
