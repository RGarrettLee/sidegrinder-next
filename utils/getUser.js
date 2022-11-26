import supabase from "../db/connection";

async function getUser() {
    await supabase.auth.getUser().then((value) => {
        let user = {};
        if (value.data?.user) {
            user = value.data.user;
        } else {
            user = {}
        }
    })
}

const data = await getUser();

export default data;