import { useState } from "react";
import { Link } from "react-router-dom";
import store from "../../store";
// eslint-disable-next-line no-unused-vars
import { Form, Input, Button, Row, Col, message } from "antd";
import Center from "../../components/center/center";
import "./register.scss";

function Register() {
	const [messageApi, contextHolder] = message.useMessage();
	// eslint-disable-next-line no-unused-vars
	const [form, setForm] = useState({
		username: "",
		phone: "",
		password: "",
	});
	const [captchaNum, setCaptchaNum] = useState("");
	const [captchaSate, setCaptchaState] = useState(true);

	const stateChange = (key, e) => {
		setForm({ ...form, [key]: e.target.value });
	};

	const captchaChange = (key, e) => {
		if (e.target.value.length >= 6) {
			setCaptchaState(false);
		} else {
			setCaptchaState(true);
		}
		setForm({ ...form, [key]: e.target.value });
	};
	const onCaptcha = () => {
		messageApi.success("验证码已发送！==> 123456");
		setCaptchaNum("123456");
	};

	const onFinish = () => {
		// console.log(values);
		console.log(form);
		store.dispatch({
			type: "NEW_USERINFO",
			value: { ...form },
		});
	};

	return (
		<div className="register">
			{contextHolder}
			<Center>
				<h1 className="register_title">注册账号</h1>
				<Form style={{ minWidth: "250px" }} onFinish={onFinish}>
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
						name="phone"
						rules={[
							{
								validator: (rule, value) => {
									let reg = /^(?:(?:\+|00)86)?1[3-9]\d{9}$/;
									if (reg.test(value)) {
										return Promise.resolve("请输入正确的手机号！");
									}
									return Promise.reject();
								},
							},
						]}>
						<Input
							placeholder="请输入注册用的手机号！"
							onChange={captchaChange.bind(this, "phone")}
						/>
					</Form.Item>
					<Form.Item>
						<Row gutter={20}>
							<Col>
								<Form.Item
									name="captcha"
									noStyle
									rules={[
										{
											validator: (rule, value) => {
												// console.log(value, captchaNum);
												if (value === captchaNum) {
													return Promise.resolve();
												} else {
													return Promise.reject("验证码错误！");
												}
											},
										},
									]}>
									<Input placeholder="请输入验证码" />
								</Form.Item>
							</Col>
							<Col>
								<Form.Item noStyle>
									<Button
										type="primary"
										disabled={captchaSate}
										onClick={onCaptcha}>
										获取验证码
									</Button>
								</Form.Item>
							</Col>
						</Row>
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
							placeholder="请输入新密码"
							onChange={stateChange.bind(this, "password")}
						/>
					</Form.Item>
					<Form.Item>
						<Button
							className="login_btn"
							block={true}
							type="primary"
							htmlType="submit">
							确定
						</Button>
					</Form.Item>
					<Form.Item>
						<div className="login_more">
							<span>
								<Link to={"/forget"}>忘记密码？</Link>
							</span>
							<span>
								已有账号？<Link to={"/login"}>立即登入</Link>
							</span>
						</div>
					</Form.Item>
				</Form>
			</Center>
		</div>
	);
}

export default Register;
