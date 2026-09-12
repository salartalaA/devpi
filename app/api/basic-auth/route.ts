import { NextResponse } from "next/server";

export function GET(request: Request) {
  const authorization = request.headers.get("authorization");

  if (!authorization) {
    return NextResponse.json(
      { message: "Authentication required" },
      { status: 401 }
    );
  }

  const [scheme, encoded] = authorization.split(" ");

  if (scheme !== "Basic" || !encoded) {
    return NextResponse.json(
      { message: "Invalid authentication" },
      { status: 401 }
    );
  }

  const decoded = atob(encoded);
  const [username, password] = decoded.split(":");

  if (username !== "admin" || password !== "1234") {
    return NextResponse.json(
      { message: "Invalid username or password" },
      { status: 401 }
    );
  }

  return NextResponse.json({
    authenticated: true,
    username,
  });
}
