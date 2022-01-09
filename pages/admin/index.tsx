
const index = ()=><div></div>;
export default index; 

export const getServerSideProps = function ({
}) {
	
	return {
		redirect: {
			destination: '/admin/dashboard',
			permanent: false,
		},
	}
}