
const index = ()=><div></div>;
export default index; 

export const getServerSideProps = async function ({
}) {
	
	return {
		redirect: {
			destination: '/user/dashboard',
			permanent: false,
		},
	}
}