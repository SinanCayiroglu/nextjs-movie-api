/** @type {import('next').NextConfig} */
const nextConfig = {
    typescript: {
        //ignoreBuildErrors: true, // temp add for next-auth failded build issues
        },
    images:{
        domains:["image.tmdb.org"]
    }
};

export default nextConfig;
