import dbConnect from "@/lib/mongoDbConnect";
import User from "@/models/user.model";

export async function GET(request, { params }) {
   try {
      await dbConnect();
      const id = params.id;
      const user = await User.findById(id);
      if (!user)
         return Response.json({ data: "User not found" }, { status: 402 });

      return Response.json({ data: user });
   } catch (error) {
      return Response.json({ data: error.message }, { status: 500 });
   }
}
