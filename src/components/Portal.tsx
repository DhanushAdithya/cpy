import { motion } from "framer-motion";
import {
	useRef,
	createContext,
	useEffect,
	useState,
	ReactNode,
	useContext,
} from "react";
import { createPortal } from "react-dom";

type Props = {
	children: ReactNode;
	show: boolean;
	setShow: (show: any) => void;
};

const ModalContext = createContext<{
	setShow: Function;
	show: boolean;
}>({
	setShow: () => {},
	show: false,
});

export const useModal = () => useContext(ModalContext);

const Portal = ({ children, show, setShow }: Props) => {
	const ref = useRef<Element | null>(null);
	const [mounted, setMounted] = useState(false);

	useEffect(() => {
		ref.current = document.querySelector<HTMLDivElement>("#portal");
		if (show) document.body.style.overflow = "hidden";
		setMounted(true);
		return () => {
			document.body.style.overflow = "unset";
		};
	}, [show]);

	return mounted && ref.current
		? createPortal(
				<ModalContext.Provider value={{ show, setShow }}>
					<div
						className="w-screen flex items-center justify-center h-screen bg-[#10031A9f] top-0 left-0 fixed z-50"
						onClick={() => setShow((show: boolean) => !show)}
					>
						<motion.div
							animate={{ scale: 1 }}
							exit={{ scale: 0.7 }}
							initial={{ scale: 0.7 }}
							className="flex"
							key={"modal-content"}
							onClick={() => setShow((show: boolean) => !show)}
						>
							{children}
						</motion.div>
					</div>
				</ModalContext.Provider>,
				ref.current
		  )
		: null;
};

export default Portal;
