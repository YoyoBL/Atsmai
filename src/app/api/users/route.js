import dbConnect from "@/lib/mongoDbConnect";
import User from "@/models/user.model";
import bcrypt from "bcrypt";

export async function POST(req) {
   try {
      await dbConnect();
      // check if user exists
      const body = await req.json();

      const email = body.email.toLowerCase();
      const exists = await User.findOne({ email });

      if (exists) throw new Error("Email already registered.");
      const hashedPassword = await bcrypt.hash(body.password, 12);
      const newUser = await User.create({
         ...body,
         email,
         password: hashedPassword,
      });
      const { firstName, lastName, _id } = newUser;
      return Response.json({ firstName, lastName, email, _id: _id.toString() });
   } catch (error) {
      console.log(error);
      return Response.json({ error: error.message }, { status: 400 });
   }
}
