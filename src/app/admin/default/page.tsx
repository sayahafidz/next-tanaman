'use client';
import axios from "axios";
import React, { useEffect, useRef, useId, useState, useCallback } from "react";
import { UserType } from "types/user";
import { BiEdit, BiTrash } from "react-icons/bi";
import { TbReportSearch } from "react-icons/tb";
import Link from "next/link";
import { ReportType } from "types/report";
import Select from 'react-select';
import PageLoading from "components/loading/LoadingSkeleton";
import DeleteButton from "components/buttons/DeleteButton";
import CreateButton from "components/buttons/CreateButton";
import { isWindowAvailable } from "utils/navigation";
import PieChartDashboard from 'components/charts/PieChartDashboard';
import PieChartDashboardDonut from 'components/charts/PieChartDashboardDonut';
import ComplexTable from "components/admin/data-tables/ComplexTable";
import TableListPI from "components/admin/data-tables/TablePI";
import TableListCA from "components/admin/data-tables/TableCA";


import cookie from "js-cookie";
import { Tokens } from "types/token";


const Dashboard = () => {

	const [darkmode, setDarkmode] = useState(
		document.body.classList.contains('dark')
	);

	// temp data for table 
	const dataTempTable = {
		"status_code": 200,
		"message": "table data displayed successfully",
		"payload": [
			{
				"id": 1,
				"no_blok": "001",
				"w1": "RBT Dibawah Potensi",
				"w2": "Kondisi Kebun",
				"w3": "Anak Kayu Berat",
				"w4": "Value 4",
				"w5": "Value 5",
				"ca": "CA1",
				"color": "Color1",
				"month": "January",
				"year": 2024,
				"createdAt": "2024-01-01T00:00:00Z",
				"updatedAt": "2024-01-01T00:00:00Z"
			},
			{
				"id": 2,
				"no_blok": "002",
				"w1": "RBT Dibawah Potensi",
				"w2": "Kondisi Kebun",
				"w3": "Semak Lalang",
				"w4": "Value 4",
				"w5": "Value 5",
				"ca": "CA2",
				"color": "Color2",
				"month": "February",
				"year": 2024,
				"createdAt": "2024-02-01T00:00:00Z",
				"updatedAt": "2024-02-01T00:00:00Z"
			},
			{
				"id": 3,
				"no_blok": "003",
				"w1": "RBT Dibawah Potensi",
				"w2": "Kondisi Kebun",
				"w3": "Pasar Pikul dan Gawangan Semak Gulma (Lunak)",
				"w4": "Value 4",
				"w5": "Value 5",
				"ca": "CA3",
				"color": "Color3",
				"month": "March",
				"year": 2024,
				"createdAt": "2024-03-01T00:00:00Z",
				"updatedAt": "2024-03-01T00:00:00Z"
			},
			{
				"id": 4,
				"no_blok": "004",
				"w1": "RBT Dibawah Potensi",
				"w2": "Infrastruktur",
				"w3": "Main Road Kondisi Berat",
				"w4": "Value 4",
				"w5": "Value 5",
				"ca": "CA4",
				"color": "Color4",
				"month": "April",
				"year": 2024,
				"createdAt": "2024-04-01T00:00:00Z",
				"updatedAt": "2024-04-01T00:00:00Z"
			},
			{
				"id": 5,
				"no_blok": "005",
				"w1": "RBT Dibawah Potensi",
				"w2": "Infrastruktur",
				"w3": "Collection Road Kondisi Berat",
				"w4": "Value 4",
				"w5": "Value 5",
				"ca": "CA5",
				"color": "Color5",
				"month": "May",
				"year": 2024,
				"createdAt": "2024-05-01T00:00:00Z",
				"updatedAt": "2024-05-01T00:00:00Z"
			},
			{
				"id": 6,
				"no_blok": "006",
				"w1": "RBT Dibawah Potensi",
				"w2": "Infrastruktur",
				"w3": "Titi Panen tidak tersedia",
				"w4": "Value 4",
				"w5": "Value 5",
				"ca": "CA6",
				"color": "Color6",
				"month": "June",
				"year": 2024,
				"createdAt": "2024-06-01T00:00:00Z",
				"updatedAt": "2024-06-01T00:00:00Z"
			},
			{
				"id": 7,
				"no_blok": "007",
				"w1": "RBT Dibawah Potensi",
				"w2": "Infrastruktur",
				"w3": "Akses Sulit pada areal terasan",
				"w4": "Value 4",
				"w5": "Value 5",
				"ca": "CA7",
				"color": "Color7",
				"month": "July",
				"year": 2024,
				"createdAt": "2024-07-01T00:00:00Z",
				"updatedAt": "2024-07-01T00:00:00Z"
			},
			{
				"id": 8,
				"no_blok": "008",
				"w1": "RBT Dibawah Potensi",
				"w2": "Tanaman",
				"w3": "Defisiensi Unsur Hara",
				"w4": "Value 4",
				"w5": "Value 5",
				"ca": "CA8",
				"color": "Color8",
				"month": "August",
				"year": 2024,
				"createdAt": "2024-08-01T00:00:00Z",
				"updatedAt": "2024-08-01T00:00:00Z"
			},
			{
				"id": 9,
				"no_blok": "009",
				"w1": "RBT Dibawah Potensi",
				"w2": "Tanaman",
				"w3": "Serangan Hama UPDKS",
				"w4": "Value 4",
				"w5": "Value 5",
				"ca": "CA9",
				"color": "Color9",
				"month": "September",
				"year": 2024,
				"createdAt": "2024-09-01T00:00:00Z",
				"updatedAt": "2024-09-01T00:00:00Z"
			}
		]
	};






	// Toggle dark mode
	const handleDarkmode = useCallback(() => {
		setDarkmode(prevDarkmode => {
			const newDarkmode = !prevDarkmode;
			document.body.classList.toggle('dark', newDarkmode);
			return newDarkmode;
		});
	}, []);

	useEffect(() => {
		document.body.classList.toggle('dark', darkmode);
	}, [darkmode]);


	if (isWindowAvailable()) {
		document.title = 'Dashboard';
	}

	const customStyles = {
		control: (provided, state) => ({
			...provided,
			backgroundColor: '#F9FAFB', // bg-gray-50
			borderColor: state.isFocused ? '#38A169' : '#38A169', // border-green-600
			color: '#1A202C', // text-gray-900
			borderRadius: '100px', // rounded-full
			paddingLeft: '2.5rem', // pl-10
			padding: '0.1rem', // p-2.5
			boxShadow: state.isFocused ? '0 0 0 2px rgba(56, 161, 105, 0.5)' : null, // focus:ring-2 focus:ring-opacity-50
			'&:hover': {
				borderColor: '#38A169',
			},
			'&:active': {
				outline: 'none',
			},
			'&:focus': {
				outline: 'none',
			},
		}),
		placeholder: (provided) => ({
			...provided,
			color: '#A0AEC0', // text-gray-500
		}),
		singleValue: (provided) => ({
			...provided,
			color: '#1A202C', // text-gray-900
		}),
		menuPortal: (provided) => ({
			...provided,
			zIndex: 9999,
		}),
	};

	type Data = {
		report: {
			value: string;
			label: string;
		}
	};


	// GET TAHUN DATA
	const [dataReport, setDataReport] = useState<any>([]);
	// const [dataAllReport, setAllDataReport] = useState<any>([]);
	const [bulan, setBulan] = useState<any>(1);
	const [tahun, setTahun] = useState<any>(2021);
	const [emas, setEmas] = useState<any>(0);
	const [hitam, setHitam] = useState<any>(0);
	const [hijau, setHijau] = useState<any>(0);
	const [kuning, setKuning] = useState<any>(0);
	const [merah, setMerah] = useState<any>(0);
	const [tua, setTua] = useState<any>(0);
	const [muda, setMuda] = useState<any>(0);
	const [remaja, setRemaja] = useState<any>(0);
	const [renta, setRenta] = useState<any>(0);
	const [dewasa, setDewasa] = useState<any>(0);





	// Mengambil data kebun dari API
	const getAllReport = async () => {
		const loginData = cookie.get("token");
		const tokenData: Tokens = JSON.parse(loginData || "{}");

		const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/report`, {
			method: "GET",
			headers: {
				accept: "application/json",
				"Content-Type": "application/json",
				Authorization: `Bearer ${tokenData.payload.access_token}`,
			},
		});
		const data = await res.json();
		if (data.status_code === 200) {
			// console.log(data.data);
			// set mappedData to value label

			let bulanOpt = [
				{ value: '1', label: 'Januari' },
				{ value: '2', label: 'Februari' },
				{ value: '3', label: 'Maret' },
				{ value: '4', label: 'April' },
				{ value: '5', label: 'Mei' },
				{ value: '6', label: 'Juni' },
				{ value: '7', label: 'Juli' },
				{ value: '8', label: 'Agustus' },
				{ value: '9', label: 'September' },
				{ value: '10', label: 'Oktober' },
				{ value: '11', label: 'November' },
				{ value: '12', label: 'Desember' },
			];
			const mappedData = data.payload.map((item: any) => {
				return {
					value: item.id,
					label: bulanOpt[item.bulan - 1].label + " " + item.tahun
				};
			});

			setDataReport(mappedData);

			// setAllDataReport(data.payload);

			setEmas(data.payload[0].emas);
			setHitam(data.payload[0].hitam);
			setHijau(data.payload[0].hijau);
			setKuning(data.payload[0].kuning);
			setMerah(data.payload[0].merah);
			setTua(data.payload[0].tua);
			setMuda(data.payload[0].muda);
			setRemaja(data.payload[0].remaja);
			setRenta(data.payload[0].renta);
			setDewasa(data.payload[0].dewasa);
			setBulan(data.payload[0].bulan);
			setTahun(data.payload[0].tahun);

			console.log(data.payload);

		} else {
			// handle error
			console.error("Failed to fetch data");
		}
	};


	const fetchFilteredData = async () => {
		try {
			const loginData = cookie.get("token");
			const tokenData = JSON.parse(loginData || "{}");

			const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/grafik/filter?tahun=2024&bulan=1&rpc=&kebun=&afd=`, {
				method: "GET",
				headers: {
					accept: "application/json",
					"Content-Type": "application/json",
					Authorization: `Bearer ${tokenData.payload.access_token}`,
				},
			});

			if (!res.ok) {
				throw new Error("Network response was not ok");
			}

			const resultData = await res.json();
			return resultData;
		} catch (error) {
			console.error("Failed to fetch data:", error);
			throw error;
		}
	};

	const processPieData = (setPieData: any, data: any, category: string, stateName: string) => {
		if (data.result && data.result[category]) {
			const categoryData = data.result[category];

			const builderJson = {
				all: categoryData.hitam + categoryData.emas + categoryData.hijau + categoryData.kuning + categoryData.merah,
				charts: {
					hitam: categoryData.hitam,
					emas: categoryData.emas,
					hijau: categoryData.hijau,
					kuning: categoryData.kuning,
					merah: categoryData.merah,
				},
			};

			const downloadJson = {
				hitam: categoryData.hitam,
				emas: categoryData.emas,
				hijau: categoryData.hijau,
				kuning: categoryData.kuning,
				merah: categoryData.merah,
			};

			setPieData({ [`builderJson${stateName}`]: builderJson, [`downloadJson${stateName}`]: downloadJson });
		} else {
			console.error(`Failed to fetch data for ${category}: `, data.message);
		}
	};



	// table
	if (isWindowAvailable()) document.title = "Dashboard - PICA";

	const [dataAllUser, setDataAllUser] = useState<UserType[]>([]);
	const [currentPage, setCurrentPage] = useState(1);
	const itemsPerPage = 10;

	// Mengambil data user dari API
	const getAllDataUser = async () => {
		setIsLoading(true);
		const loginData = cookie.get("token");
		const tokenData: Tokens = JSON.parse(loginData || "{}");

		const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users`, {
			method: "GET",
			headers: {
				accept: "application/json",
				"Content-Type": "application/json",
				Authorization: `Bearer ${tokenData.payload.access_token}`,
			},
		});
		const data = await res.json();
		if (data.status_code === 200) {
			setDataAllUser(data.payload);
			setIsLoading(false);
		}
		console.log(cookie.get("token"));
	};

	useEffect(() => {
		getAllDataUser();
	}, []);

	const indexOfLastItem = currentPage * itemsPerPage;
	const indexOfFirstItem = indexOfLastItem - itemsPerPage;
	const currentItems = dataAllUser
		.filter((user) => {
			if (searchInput === "") {
				return user;
			} else if (
				user.username?.toLowerCase().includes(searchInput?.toLowerCase()) ||
				user.role?.toLowerCase().includes(searchInput?.toLowerCase())
			) {
				return user;
			}
		});

	// Mengubah halaman saat ini
	const paginate = (pageNumber: number) => {
		setCurrentPage(pageNumber);
	};




	const instanceId = useId();

	const [pieDataTua, setPieDataTua] = useState<any>({
		builderJsonTua: null,
		downloadJsonTua: null,
	});
	const [pieDataRemaja, setPieDataRemaja] = useState<any>({
		builderJsonRemaja: null,
		downloadJsonRemaja: null,
	});
	const [pieDataRenta, setPieDataRenta] = useState<any>({
		builderJsonRenta: null,
		downloadJsonRenta: null,
	});
	const [pieDataMuda, setPieDataMuda] = useState<any>({
		builderJsonMuda: null,
		downloadJsonMuda: null,
	});
	const [pieDataDewasa, setPieDataDewasa] = useState<any>({
		builderJsonDewasa: null,
		downloadJsonDewasa: null,
	});

	useEffect(() => {
		const fetchData = async () => {
			try {
				const resultData = await fetchFilteredData();
				processPieData(setPieDataTua, resultData, 'tua', 'Tua');
				processPieData(setPieDataRemaja, resultData, 'remaja', 'Remaja');
				processPieData(setPieDataRenta, resultData, 'renta', 'Renta');
				processPieData(setPieDataMuda, resultData, 'muda', 'Muda');
				processPieData(setPieDataDewasa, resultData, 'dewasa', 'Dewasa');
			} catch (error) {
				console.error("Error fetching and processing data", error);
			}
		};

		fetchData();

		getAllReport();
	}, []);


	const [filters, setFilters] = useState({
		selectedBulan: "",
		selectedTahun: "",
		selectedRpc: "",
		selectedKebun: "",
		selectedAfd: "",
	});
	const apiUrl = process.env.NEXT_PUBLIC_API_URL;

	const [dataAllReport, setDataAllReport] = useState<ReportType[]>([]);
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [searchInput, setSearchInput] = useState<string>("");
	const [cursor, setCursor] = useState<number | null>(null);
	const [nextCursor, setNextCursor] = useState<number | null>(null);
	const [limitPerPage, setLimitPerPage] = useState<number>(10);
	const [isEndOfData, setIsEndOfData] = useState<boolean>(false);
	const [totalItems, setTotalItems] = useState<number>(0);
	const [sortBy, setSortBy] = useState<string>("id");
	const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");
	const [tahunOptions, setTahunOptions] = useState<{ value: string; label: string }[]>([]);
	const [bulanOptions, setBulanOptions] = useState<{ value: string; label: string }[]>([]);
	const [regionalOptions, setRpcOptions] = useState<{ value: string; label: string }[]>([]);
	const [kebunOptions, setKebunOptions] = useState<{ value: string; label: string }[]>([]);
	const [afdOptions, setAfdOptions] = useState<{ value: string; label: string }[]>([]);
	const fetchData = useCallback(async (newCursor) => {
		try {
			const loginData = cookie.get("token");
			const tokenData = JSON.parse(loginData || "{}");

			const response = await axios.get(`${apiUrl}/identifikasiMasalah`, {
				headers: {
					Authorization: `Bearer ${tokenData.payload.access_token}`,
				},
				params: {
					limit: limitPerPage,
					cursor: newCursor || cursor,
					search: searchInput,
					sortBy: sortBy,
					sortDirection: sortDirection,
					tahun: filters.selectedTahun,
					bulan: filters.selectedBulan,
					rpc: filters.selectedRpc,
					kebun: filters.selectedKebun,
					afd: filters.selectedAfd,
				},
			});

			const { totalItems, nextCursor, kuadrans } = response.data;

			// Replace data when newCursor is provided or reset when fetching initial data
			setDataAllReport(newCursor ? kuadrans : kuadrans);
			setNextCursor(nextCursor);
			setIsEndOfData(kuadrans.length < limitPerPage);
			setTotalItems(totalItems);
		} catch (error) {
			console.error("Error fetching data:", error);
		} finally {
			setIsLoading(false);
		}
	}, [apiUrl, cursor, searchInput, sortBy, sortDirection, filters.selectedTahun, filters.selectedBulan, filters.selectedRpc, filters.selectedKebun, filters.selectedAfd, limitPerPage]);

	const handleFilterChange = (selectedOption, filterKey) => {
		setFilters(prevFilters => ({
			...prevFilters,
			[filterKey]: selectedOption ? selectedOption.value : "",
		}));
		setCursor(null);

		// Automatically fetch dependent options when a filter is selected
		if (filterKey === "selectedTahun") {
			fetchBulanOptions(selectedOption ? selectedOption.value : "");
		} else if (filterKey === "selectedBulan") {
			fetchRpcOptions(filters.selectedTahun, selectedOption ? selectedOption.value : "");
		} else if (filterKey === "selectedRpc") {
			fetchKebunOptions(filters.selectedTahun, filters.selectedBulan, selectedOption ? selectedOption.value : "");
		} else if (filterKey === "selectedKebun") {
			fetchAfdOptions(filters.selectedTahun, filters.selectedBulan, filters.selectedRpc, selectedOption ? selectedOption.value : "");
		}
	};

	const fetchTahunOptions = useCallback(async () => {
		try {
			const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/tahun`);
			const tahunData = response.data.map((item: { tahun: number }) => ({
				value: item.tahun.toString(),
				label: item.tahun.toString(),
			}));
			setTahunOptions(tahunData);
		} catch (error) {
			console.error("Error fetching tahun options:", error);
		}
	}, []);

	const fetchBulanOptions = async (tahun) => {
		const monthNames = [
			"Januari", "Februari", "Maret", "April", "Mei", "Juni",
			"Juli", "Agustus", "September", "Oktober", "November", "Desember"
		];

		try {
			const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/bulan/${tahun}`);
			const data = response.data;
			const bulanOptions = data.map((item) => ({
				value: item.bulan,
				label: monthNames[item.bulan - 1],  // Convert the integer to the month name
			}));
			setBulanOptions(bulanOptions);
		} catch (error) {
			console.error("Error fetching bulan options:", error);
		}
	};


	const fetchRpcOptions = async (tahun: string, bulan: string) => {
		try {
			const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/rpc/${tahun}/${bulan}`);
			const data = response.data;
			const regionalOptions = data.map((item: { rpc: string }) => ({
				value: item.rpc,
				label: item.rpc,
			}));
			setRpcOptions(regionalOptions);
		} catch (error) {
			console.error("Error fetching rpc options:", error);
		}
	};

	const fetchKebunOptions = async (tahun: string, bulan: string, rpc: string) => {
		try {
			const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/kebun/${tahun}/${bulan}/${rpc}`);
			const data = response.data;
			const kebunOptions = data.map((item: { kebun: string }) => ({
				value: item.kebun,
				label: item.kebun,
			}));
			setKebunOptions(kebunOptions);
		} catch (error) {
			console.error("Error fetching kebun options:", error);
		}
	};

	const fetchAfdOptions = async (tahun: string, bulan: string, rpc: string, kebun: string) => {
		try {
			const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/afd/${tahun}/${bulan}/${rpc}/${kebun}`);
			const data = response.data;
			const afdOptions = data.map((item: { afd: string }) => ({
				value: item.afd,
				label: item.afd,
			}));
			setAfdOptions(afdOptions);
		} catch (error) {
			console.error("Error fetching afd options:", error);
		}
	};


	useEffect(() => {
		fetchData(cursor);
	}, [cursor, searchInput, sortBy, sortDirection, filters, fetchData]);

	useEffect(() => {
		fetchTahunOptions();
	}, [fetchTahunOptions]);

	return (
		<div className="w-full min-h-screen">
			<div className="mt-10 mb-5">
				<div className="border-gray-200 rounded-lg shadow-lg dark:border-navy-700 border-opacity-50 border-[2px] backdrop-filter backdrop-blur-lg bg-white dark:bg-navy-900 dark:text-white z-10 relative">
					<div className="p-4 border-b border-gray-200 dark:border-navy-700 flex justify-center">
						<h1 className="text-lg font-semibold text-navy-800 dark:text-white">GRAFIK MONITORING PICA</h1>
					</div>
					<div className="p-4">
						<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 p-4 mt-4 relative z-50">
							<div className="mr-4">
								<Select
									options={tahunOptions}
									placeholder="Pilih Tahun"
									value={tahunOptions.find(option => option.value === filters.selectedTahun)}
									onChange={(selectedOption) => handleFilterChange(selectedOption, "selectedTahun")}
									isClearable
									styles={customStyles}
								/>
							</div>
							<div className="mr-4">
								<Select
									options={bulanOptions}
									placeholder="Pilih Bulan"
									value={bulanOptions.find(option => option.value === filters.selectedBulan)}
									onChange={(selectedOption) => handleFilterChange(selectedOption, "selectedBulan")}
									isClearable
									styles={customStyles}
								/>
							</div>
							<div className="mr-4">
								<Select
									options={regionalOptions}
									placeholder="Pilih RPC"
									value={regionalOptions.find(option => option.value === filters.selectedRpc)}
									onChange={(selectedOption) => handleFilterChange(selectedOption, "selectedRpc")}
									isClearable
									styles={customStyles}
								/>
							</div>
							<div className="mr-4">
								<Select
									options={kebunOptions}
									placeholder="Pilih Kebun"
									value={kebunOptions.find(option => option.value === filters.selectedKebun)}
									onChange={(selectedOption) => handleFilterChange(selectedOption, "selectedKebun")}
									isClearable
									styles={customStyles}
								/>
							</div>
							<div className="mr-4">
								<Select
									options={afdOptions}
									placeholder="Pilih AFD"
									value={afdOptions.find(option => option.value === filters.selectedAfd)}
									onChange={(selectedOption) => handleFilterChange(selectedOption, "selectedAfd")}
									isClearable
									styles={customStyles}
								/>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div className="flex gap-5 items-start">
				{/* Pie Charts Section */}
				<div className="flex-1 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
					<div className="flex justify-center">
						<PieChartDashboardDonut nameData="Total" downloadJsonData={pieDataMuda.downloadJsonMuda} builderJsonData={pieDataMuda.builderJsonMuda} />
					</div>
					<div className="flex justify-center">
						<PieChartDashboard nameData="Muda" downloadJsonData={pieDataMuda.downloadJsonMuda} builderJsonData={pieDataMuda.builderJsonMuda} />
					</div>
					<div className="flex justify-center">
						<PieChartDashboard nameData="Remaja" downloadJsonData={pieDataRemaja.downloadJsonRemaja} builderJsonData={pieDataRemaja.builderJsonRemaja} />
					</div>
					<div className="flex justify-center">
						<PieChartDashboard nameData="Dewasa" downloadJsonData={pieDataDewasa.downloadJsonDewasa} builderJsonData={pieDataDewasa.builderJsonDewasa} />
					</div>
					<div className="flex justify-center">
						<PieChartDashboard nameData="Tua" downloadJsonData={pieDataTua.downloadJsonTua} builderJsonData={pieDataTua.builderJsonTua} />
					</div>
					<div className="flex justify-center">
						<PieChartDashboard nameData="Renta" downloadJsonData={pieDataRenta.downloadJsonRenta} builderJsonData={pieDataRenta.builderJsonRenta} />
					</div>
				</div>

				{/* Tables Section */}
				<div className="flex-1 grid grid-cols-1 gap-5">
					<div className="flex justify-center">
						<TableListPI />
					</div>
					<div className="flex justify-center">
						<TableListCA />
					</div>
				</div>
			</div>

		</div>
	);

}

export default Dashboard;
